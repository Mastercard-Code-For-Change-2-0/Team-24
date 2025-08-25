import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  UserCheck, 
  Phone, 
  MapPin, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Plus,
  FileText,
  Trash2,
  Download,
  Upload,
  GraduationCap,
  Briefcase,
  Check,
  Loader2
} from 'lucide-react';

const ProfilePage = () => {
  // Initial profile data based on the API response
  const [profile, setProfile] = useState({
    id: 1,
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    batch: 2023,
    role: "student",
    contact: "+91-9876543210",
    address: "456 FC Road, Pune, Maharashtra - 411016",
    profile_picture: null,
    skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB"],
    education: ["B.Tech Computer Science - Pune Institute of Technology (2020)"],
    createdAt: "2025-08-25T08:03:11.823Z",
    updatedAt: "2025-08-25T08:03:11.823Z"
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [documents, setDocuments] = useState([
    { id: 1, name: "Resume.pdf", type: "pdf", uploadDate: "2025-08-20", size: "1.2 MB" },
    { id: 2, name: "Certificate.jpg", type: "image", uploadDate: "2025-08-18", size: "856 KB" },
  ]);

  const [editMode, setEditMode] = useState({});
  const [editValues, setEditValues] = useState({});
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });
  const [newDocument, setNewDocument] = useState('');
  const [notification, setNotification] = useState(null);

  // API Base URL
  const API_BASE_URL = 'http://localhost:3000/api';

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // API Functions
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/profile`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setApiError('Failed to fetch profile data');
      }
    } catch (error) {
      setApiError('Network error: ' + error.message);
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        showNotification('Profile updated successfully!');
        return true;
      } else {
        const errorData = await response.json();
        setApiError(errorData.message || 'Failed to update profile');
        showNotification('Failed to update profile', 'error');
        return false;
      }
    } catch (error) {
      setApiError('Network error: ' + error.message);
      showNotification('Network error occurred', 'error');
      console.error('Error updating profile:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Show temporary notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const startEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setEditValues({ ...editValues, [field]: profile[field] });
  };

  const cancelEdit = (field) => {
    setEditMode({ ...editMode, [field]: false });
    setEditValues({ ...editValues, [field]: undefined });
  };

  const saveEdit = async (field) => {
    const updatedProfile = { ...profile, [field]: editValues[field] };
    const success = await updateProfile(updatedProfile);
    
    if (success) {
      setEditMode({ ...editMode, [field]: false });
      setEditValues({ ...editValues, [field]: undefined });
    }
  };

  const handleInputChange = (field, value) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const addSkill = async () => {
    if (newSkill.trim()) {
      const updatedSkills = [...profile.skills, newSkill.trim()];
      const success = await updateProfile({ ...profile, skills: updatedSkills });
      
      if (success) {
        setNewSkill('');
        setShowSkillForm(false);
      }
    }
  };

  const removeSkill = async (index) => {
    const newSkills = profile.skills.filter((_, i) => i !== index);
    await updateProfile({ ...profile, skills: newSkills });
  };

  const addEducation = async () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      const updatedEducation = [...profile.education, { ...newEducation }];
      const success = await updateProfile({ ...profile, education: updatedEducation });
      
      if (success) {
        setNewEducation({ degree: '', institution: '', year: '' });
        setShowEducationForm(false);
      }
    }
  };

  const removeEducation = async (index) => {
    const newEducationList = profile.education.filter((_, i) => i !== index);
    await updateProfile({ ...profile, education: newEducationList });
  };

  const uploadDocument = () => {
    if (newDocument.trim()) {
      const newDoc = {
        id: documents.length + 1,
        name: newDocument.trim(),
        type: newDocument.includes('.pdf') ? 'pdf' : 'image',
        uploadDate: new Date().toISOString().split('T')[0],
        size: (Math.random() * 2 + 0.5).toFixed(1) + " MB"
      };
      setDocuments([...documents, newDoc]);
      setNewDocument('');
      setShowDocumentForm(false);
      showNotification('Document uploaded successfully!');
    }
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    showNotification('Document deleted successfully!');
  };

  const EditableField = ({ field, label, icon, value, multiline = false, type = "text" }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-gray-600">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        {!editMode[field] && (
          <button
            onClick={() => startEdit(field)}
            className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-md hover:bg-blue-50"
          >
            <Edit3 size={20} />
          </button>
        )}
      </div>
      
      {editMode[field] ? (
        <div className="space-y-3">
          {multiline ? (
            <textarea
              value={editValues[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows={3}
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          ) : (
            <input
              type={type}
              value={editValues[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          )}
          <div className="flex gap-2">
            <button
              onClick={() => saveEdit(field)}
              className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              <Save size={14} />
              Save
            </button>
            <button
              onClick={() => cancelEdit(field)}
              className="flex items-center gap-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 font-medium">
          {value || <span className="text-gray-400 italic">Not provided</span>}
        </p>
      )}
    </div>
  );

  // Notification Component
  const Notification = ({ message, type }) => (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`}>
      <div className="flex items-center gap-2">
        <Check size={16} />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="animate-spin text-blue-500" size={24} />
      <span className="ml-2 text-gray-600">Updating...</span>
    </div>
  );

  // Error Display Component
  const ErrorDisplay = ({ error, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-700">
          <X size={16} />
          <span className="font-medium">Error: {error}</span>
        </div>
        <button
          onClick={onRetry}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Retry
        </button>
      </div>
    </div>
  );

  if (loading && !profile.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Notification */}
      {notification && <Notification message={notification.message} type={notification.type} />}
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6">
            <LoadingSpinner />
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        {/* Error Display */}
        {apiError && (
          <ErrorDisplay 
            error={apiError} 
            onRetry={() => {
              setApiError(null);
              fetchProfile();
            }} 
          />
        )}
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 capitalize">{profile.name}</h1>
              <p className="text-gray-600 capitalize flex items-center gap-2 mt-1">
                <UserCheck size={16} />
                {profile.role} - Batch {profile.batch}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            <EditableField
              field="name"
              label="Full Name"
              icon={<User size={16} />}
              value={profile.name}
            />
            
            <EditableField
              field="email"
              label="Email"
              icon={<Mail size={16} />}
              value={profile.email}
              type="email"
            />
            
            <EditableField
              field="contact"
              label="Contact Number"
              icon={<Phone size={16} />}
              value={profile.contact || ''}
              type="tel"
            />
            
            <EditableField
              field="address"
              label="Address"
              icon={<MapPin size={16} />}
              value={profile.address || ''}
              multiline={true}
            />

            {/* Skills Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={16} />
                  <span className="font-medium">Skills</span>
                </div>
                <button
                  onClick={() => setShowSkillForm(!showSkillForm)}
                  className="text-blue-500 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                >
                  <Plus size={16} />
                </button>
              </div>

              {showSkillForm && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a new skill"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      <Plus size={14} />
                      Add Skill
                    </button>
                    <button
                      onClick={() => {setShowSkillForm(false); setNewSkill('');}}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="text-gray-800 font-medium">{skill}</span>
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic text-center py-4">No skills added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Middle Column - Education & Documents */}
          <div className="space-y-4">
            {/* Education Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap size={16} />
                  <span className="font-medium">Education</span>
                </div>
                <button
                  onClick={() => setShowEducationForm(!showEducationForm)}
                  className="text-blue-500 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                >
                  <Plus size={16} />
                </button>
              </div>

              {showEducationForm && (
                <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                      placeholder="Degree/Qualification"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                      placeholder="Institution"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={newEducation.year}
                      onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                      placeholder="Year"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={addEducation}
                      disabled={loading || !newEducation.degree || !newEducation.institution || !newEducation.year}
                      className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                    >
                      {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                      {loading ? 'Adding...' : 'Add Education'}
                    </button>
                    <button
                      onClick={() => {setShowEducationForm(false); setNewEducation({ degree: '', institution: '', year: '' });}}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {profile.education.length > 0 ? (
                  profile.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{edu.degree}</p>
                          <p className="text-sm text-gray-600 mt-1">{edu.institution}</p>
                          <p className="text-sm text-gray-500 mt-1">{edu.year}</p>
                        </div>
                        <button
                          onClick={() => removeEducation(index)}
                          disabled={loading}
                          className="text-red-400 hover:text-red-600 disabled:text-gray-300 transition-colors p-1 rounded-md hover:bg-red-50 disabled:hover:bg-transparent"
                        >
                          {loading ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic text-center py-4">No education records added yet</p>
                )}
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText size={16} />
                  <span className="font-medium">Documents</span>
                </div>
                <button
                  onClick={() => setShowDocumentForm(!showDocumentForm)}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  <Upload size={14} />
                  Upload
                </button>
              </div>

              {showDocumentForm && (
                <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <input
                    type="text"
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    placeholder="Enter document name (with extension)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3"
                    onKeyPress={(e) => e.key === 'Enter' && uploadDocument()}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={uploadDocument}
                      className="flex items-center gap-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                    >
                      <Upload size={14} />
                      Upload Document
                    </button>
                    <button
                      onClick={() => {setShowDocumentForm(false); setNewDocument('');}}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-800">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size} • {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-md hover:bg-blue-50">
                        <Download size={16} />
                      </button>
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={16} />
                Account Information
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">User ID</p>
                  <p className="font-medium text-gray-800">#{profile.id}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Account Created</p>
                  <p className="font-medium text-gray-800">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Last Updated</p>
                  <p className="font-medium text-gray-800">
                    {new Date(profile.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Role</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                    {profile.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-3">
                  📊 <span>View Activity Log</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-3">
                  🔒 <span>Change Password</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-3">
                  📧 <span>Update Notifications</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors text-sm font-medium flex items-center gap-3">
                  🗑️ <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;