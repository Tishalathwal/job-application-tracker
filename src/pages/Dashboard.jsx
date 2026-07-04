import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-600 mb-4">Welcome, {currentUser?.email}!</p>
        <Link
          to="/applications"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          View My Applications
        </Link>
      </div>
    </div>
  );
}