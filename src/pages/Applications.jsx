import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationCard from '../components/ApplicationCard';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import {
    setApplications,
    addApplication,
    updateApplication,
    deleteApplication,
    setLoading,
} from '../features/applications/applicationsSlice';
import {
    addApplicationToDb,
    getApplicationsFromDb,
    updateApplicationInDb,
    deleteApplicationFromDb,
} from '../firebase/applications';

export default function Applications() {
    const dispatch = useDispatch();
    const { currentUser } = useAuth();
    const { items, loading } = useSelector((state) => state.applications);
    const [showForm, setShowForm] = useState(false);
    const [editingApp, setEditingApp] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        async function fetchApplications() {
            dispatch(setLoading(true));
            try {
                const apps = await getApplicationsFromDb(currentUser.uid);
                dispatch(setApplications(apps));
            } catch (err) {
                console.error('Error fetching applications:', err);
            }
            dispatch(setLoading(false));
        }
        if (currentUser) fetchApplications();
    }, [currentUser, dispatch]);

    const filteredItems = items.filter((app) => {
        const matchesSearch = app.companyName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    async function handleAddOrUpdate(formData) {
        try {
            if (editingApp) {
                await updateApplicationInDb(editingApp.id, formData);
                dispatch(updateApplication({ ...formData, id: editingApp.id }));
            } else {
                const id = await addApplicationToDb(currentUser.uid, formData);
                dispatch(addApplication({ ...formData, id }));
            }
            setShowForm(false);
            setEditingApp(null);
        } catch (err) {
            console.error('Error saving application:', err);
        }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this application?')) return;
        try {
            await deleteApplicationFromDb(id);
            dispatch(deleteApplication(id));
        } catch (err) {
            console.error('Error deleting application:', err);
        }
    }

    function handleEdit(app) {
        setEditingApp(app);
        setShowForm(true);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Applications</h1>

                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            + Add Application
                        </button>
                    )}
                </div>
                <div className="mb-6">
                    <AnalyticsDashboard applications={items} />
                </div>

                <div className="flex gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Search by company name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="OA/Test">OA/Test</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {showForm && (
                    <div className="mb-6">
                        <ApplicationForm
                            onSubmit={handleAddOrUpdate}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingApp(null);
                            }}
                            initialData={editingApp}
                        />
                    </div>
                )}

                {loading ? (
                    <p className="text-gray-500">Loading applications...</p>
                ) : filteredItems.length === 0 ? (
                    <p className="text-gray-500">
                        {items.length === 0
                            ? 'No applications yet. Add your first one!'
                            : 'No applications match your search/filter.'}
                    </p>
                ) : (
                    <div className="space-y-3">
                        {filteredItems.map((app) => (
                            <ApplicationCard
                                key={app.id}
                                application={app}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}