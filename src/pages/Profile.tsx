import React, { useState, useEffect } from 'react';
import {
  User, Mail, Phone, Calendar, MapPin, Settings, Shield, Bell
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'user_profile';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    location: '',
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    setLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    alert('Profile saved to localStorage!');
    setEditing(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-600" />
              </div>
              {editing ? (
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="mt-4 text-center border p-1 rounded-md text-gray-900"
                />
              ) : (
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{profile.name}</h2>
              )}
              <p className="text-gray-500">Fitness Enthusiast</p>
            </div>

            <div className="space-y-4">
              <Field icon={Mail} label="email" value={profile.email} editing={editing} onChange={handleChange} />
              <Field icon={Phone} label="phone" value={profile.phone} editing={editing} onChange={handleChange} />
              <Field icon={Calendar} label="birthdate" value={profile.birthdate} editing={editing} onChange={handleChange} />
              <Field icon={MapPin} label="location" value={profile.location} editing={editing} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fitness Goals</h2>
            <div className="space-y-4">
              <GoalCard title="Weight Goal" target="70kg by December 2024" progress="w-3/4" />
              <GoalCard title="Activity Goal" target="5 workouts per week" progress="w-4/5" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
            <div className="space-y-4">
              {[Settings, Shield, Bell].map((Icon, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      {['Account Settings', 'Privacy & Security', 'Notifications'][idx]}
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {editing && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

function Field({ icon: Icon, label, value, editing, onChange }: any) {
  return (
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-gray-400" />
      {editing ? (
        <input
          name={label}
          value={value}
          onChange={onChange}
          className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <span className="text-gray-600">{value}</span>
      )}
    </div>
  );
}

function GoalCard({ title, target, progress }: { title: string; target: string; progress: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-gray-500">Target: {target}</p>
      <div className="mt-2 h-2 bg-gray-200 rounded-full">
        <div className={`h-2 bg-blue-600 rounded-full ${progress}`}></div>
      </div>
    </div>
  );
}
