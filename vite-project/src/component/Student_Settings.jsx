import React, { useState } from 'react';
import { Settings, User, Shield, Mail, Sun, Moon, Globe, Linkedin, Github } from 'lucide-react';

/**
 * The Settings component for the student portal.
 * It uses a tabbed layout to manage different settings sections.
 */
const Student_Settings = () => {
  const [profileForm, setProfileForm] = useState({
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91-9876543210',
    address: 'Pune, Maharashtra'
  });
  const [privacySettings, setPrivacySettings] = useState({
    twoFactor: false,
  });
  const [notificationPreferences, setNotificationPreferences] = useState({
    push: true,
    placement: true,
    newsletters: false
  });
  const [activeTab, setActiveTab] = useState('account');

  // Define the tabs for the settings page
  const tabs = [
    { id: 'account', label: 'Account Settings' },
    { id: 'privacy', label: 'Privacy & Security' },
    { id: 'notifications', label: 'Notification Preferences' },
    { id: 'theme', label: 'Application Settings' },
    { id: 'integrations', label: 'Integrations' },
  ];

  // Renders the content for the currently active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <form className="space-y-4">
            <h4 className="font-semibold text-lg">Profile Information</h4>
            <div className="flex items-center space-x-4">
              <img
                src="https://placehold.co/128x128/e5e7eb/4b5563?text=RM"
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-gray-300"
              />
              <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200">Change Photo</button>
            </div>
            {Object.entries(profileForm).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">{key}</label>
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  value={value}
                  onChange={(e) => setProfileForm({ ...profileForm, [key]: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                />
              </div>
            ))}
            <div className="pt-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
            </div>
          </form>
        );
      case 'privacy':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Privacy & Security</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Two-Factor Authentication</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacySettings.twoFactor}
                  onChange={() => setPrivacySettings({ ...privacySettings, twoFactor: !privacySettings.twoFactor })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Download Personal Data</span>
              <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200">Download</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-600">Delete Account</span>
              <button className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Email Preferences</h4>
            {Object.entries(notificationPreferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setNotificationPreferences({ ...notificationPreferences, [key]: !value })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            ))}
          </div>
        );
      case 'theme':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Appearance</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Theme</span>
              <div className="flex space-x-2 p-1 bg-gray-200 rounded-md">
                <button className="p-2 rounded-md bg-white shadow-sm text-blue-500"><Sun className="w-5 h-5" /></button>
                <button className="p-2 rounded-md text-gray-500 hover:text-gray-800"><Moon className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Language</span>
              <select className="p-2 border border-gray-300 rounded-md">
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
                <option>Tamil</option>
              </select>
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Connect Accounts</h4>
            <div className="flex items-center justify-between p-4 bg-white rounded-md border border-gray-200">
              <div className="flex items-center space-x-2">
                <Linkedin className="w-6 h-6 text-blue-700" />
                <span className="text-gray-800">LinkedIn</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Connect</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-md border border-gray-200">
              <div className="flex items-center space-x-2">
                <Github className="w-6 h-6 text-gray-800" />
                <span className="text-gray-800">GitHub</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Connect</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600">Manage your account, privacy, and preferences.</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Settings Tabs */}
          <div className="md:w-1/4">
            <ul className="space-y-2">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Settings Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{tabs.find(t => t.id === activeTab)?.label || ''}</h3>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Settings;
