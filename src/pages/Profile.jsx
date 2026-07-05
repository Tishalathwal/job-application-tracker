import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, saveUserProfile } from '../firebase/applications';

const FIELDS = ['fullName', 'phone', 'college', 'targetRole'];

export default function Profile() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    college: '',
    targetRole: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getUserProfile(currentUser.uid);
        if (profile) {
          setFormData({
            fullName: profile.fullName || '',
            phone: profile.phone || '',
            college: profile.college || '',
            targetRole: profile.targetRole || '',
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
      setLoading(false);
    }
    if (currentUser) fetchProfile();
  }, [currentUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveUserProfile(currentUser.uid, {
        ...formData,
        email: currentUser.email,
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    }
    setSaving(false);
  }

  const filledCount = FIELDS.filter((f) => formData[f]?.trim()).length;
  const completionPercent = Math.round((filledCount / FIELDS.length) * 100);

  const initial =
    formData.fullName?.charAt(0).toUpperCase() ||
    currentUser?.email?.charAt(0).toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-teal-50 to-cyan-50 px-6 sm:px-10 pt-8 pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your personal details</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 text-right">
            <p className="text-xs text-gray-500 mb-1">Profile Completion</p>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    completionPercent === 100
                      ? 'bg-teal-500'
                      : 'bg-gradient-to-r from-indigo-600 to-teal-500'
                  }`}
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <span
                className={`text-sm font-semibold ${
                  completionPercent === 100 ? 'text-teal-600' : 'text-indigo-600'
                }`}
              >
                {completionPercent}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-teal-500 text-white text-2xl font-semibold rounded-full">
              {initial}
            </div>
            <div>
              <p className="font-semibold text-lg text-gray-900">
                {formData.fullName || 'No name set'}
              </p>
              <p className="text-gray-500 text-sm">{currentUser?.email}</p>
            </div>
          </div>

          {message && (
            <div className="bg-teal-50 border border-teal-200 text-teal-700 text-sm px-4 py-3 rounded-lg mb-5">
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 98765 43210"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                College / University
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="e.g. XYZ University"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Target Role
              </label>
              <input
                type="text"
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={currentUser?.email || ''}
                disabled
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-5 py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-teal-600 active:scale-[0.98] transition shadow-md shadow-teal-200 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}