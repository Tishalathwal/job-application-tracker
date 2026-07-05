import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  if (!currentUser) return null;

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      location.pathname === path
        ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-sm shadow-teal-200'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  const initial = currentUser.email?.charAt(0).toUpperCase() || 'U';

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-600 to-teal-500 rounded-lg shadow-sm shadow-teal-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
          </div>
          <span className="font-bold text-lg text-gray-900 mr-2">JobTracker</span>
          <div className="flex items-center gap-1">
            <Link to="/dashboard" className={linkClass('/dashboard')}>
              Dashboard
            </Link>
            <Link to="/applications" className={linkClass('/applications')}>
              Applications
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            className="hidden sm:flex items-center gap-2 bg-gray-50 pl-1 pr-3 py-1 rounded-full border border-gray-100 hover:bg-gray-100 transition"
          >
            <div className="flex items-center justify-center w-7 h-7 bg-gradient-to-br from-indigo-600 to-teal-500 text-white text-xs font-semibold rounded-full">
              {initial}
            </div>
            <span className="text-sm text-gray-600">{currentUser.email}</span>
          </Link>
          <Link
            to="/profile"
            className="sm:hidden flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-600 to-teal-500 text-white text-xs font-semibold rounded-full"
          >
            {initial}
          </Link>
          <button
            onClick={logout}
            className="text-sm text-red-500 font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}