import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { setApplications, setLoading } from '../features/applications/applicationsSlice';
import { getApplicationsFromDb, getUserProfile } from '../firebase/applications';

const PROFILE_FIELDS = ['fullName', 'phone', 'college', 'targetRole'];

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.applications);
  const [profile, setProfile] = useState(null);

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

    async function fetchProfile() {
      try {
        const data = await getUserProfile(currentUser.uid);
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    }

    if (currentUser) {
      fetchApplications();
      fetchProfile();
    }
  }, [currentUser, dispatch]);

  const total = items.length;
  const interviews = items.filter((a) => a.status === 'Interview').length;
  const offers = items.filter((a) => a.status === 'Offer').length;

  const filledCount = profile
    ? PROFILE_FIELDS.filter((f) => profile[f]?.trim()).length
    : 0;
  const isProfileIncomplete = filledCount < PROFILE_FIELDS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 sm:px-10 pt-8 pb-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500 text-sm">Welcome back</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {profile?.fullName || currentUser?.email}
            </h1>
          </div>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-600 font-medium hover:underline"
          >
            Logout
          </button>
        </div>

        {/* Profile incomplete banner */}
        {isProfileIncomplete && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-amber-800 text-sm">
              Your profile is incomplete ({filledCount}/{PROFILE_FIELDS.length} fields filled).
              Complete it for a better experience.
            </p>
            <Link
              to="/profile"
              className="whitespace-nowrap bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition"
            >
              Complete Profile
            </Link>
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Total Applications</p>
            <p className="text-3xl font-bold text-gray-900">{total}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Interviews</p>
            <p className="text-3xl font-bold text-yellow-600">{interviews}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-1">Offers</p>
            <p className="text-3xl font-bold text-green-600">{offers}</p>
          </div>
        </div>

        {/* Quick action card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Manage Your Applications
            </h2>
            <p className="text-gray-500 text-sm">
              View, add, and track the status of every job application in one place.
            </p>
          </div>
          <Link
            to="/applications"
            className="whitespace-nowrap bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition shadow-md shadow-blue-200"
          >
            View Applications
          </Link>
        </div>
      </div>
    </div>
  );
}