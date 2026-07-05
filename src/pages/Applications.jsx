import { useEffect, useState, useRef } from 'react';
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
    const formRef = useRef(null);

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
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    function handleAddClick() {
        setShowForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 sm:px-10 pt-8 pb-10">
        <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Applications</h1>
                    <p className="text-gray-500 text-sm mt-1">Track and manage your job search</p>
                </div>

                {!showForm && (
                    <button
                        onClick={handleAddClick}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition shadow-md shadow-blue-200 whitespace-nowrap"
                    >
                        + Add Application
                    </button>
                )}
            </div>

            <div className="mb-8">
                <AnalyticsDashboard applications={items} />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search by company name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                <div ref={formRef} className="mb-6">
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
                <p className="text-gray-500 text-center py-8">Loading applications...</p>
            ) : filteredItems.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                    <p className="text-gray-500">
                        {items.length === 0
                            ? 'No applications yet. Add your first one!'
                            : 'No applications match your search/filter.'}
                    </p>
                </div>
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