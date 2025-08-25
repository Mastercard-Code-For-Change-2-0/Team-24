import React, { useState } from 'react';
import { 
  User, Mail, Calendar, UserCheck, Phone, MapPin, Camera, Edit3, Save, X, Plus,
  FileText, Trash2, Download, Upload, GraduationCap, Briefcase, Check
} from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    id: 4,
    name: "ast",
    email: "ast@gmail.com",
    batch: 2023,
    role: "student",
    contact: "",
    address: "",
    profile_picture: null,
    skills: [],
    education: [],
    createdAt: "2025-08-25T08:03:11.823Z",
    updatedAt: "2025-08-25T08:03:11.823Z"
  });

  const [documents, setDocuments] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [editValues, setEditValues] = useState({});
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });
  const [newDocumentFile, setNewDocumentFile] = useState(null);
  const [notification, setNotification] = useState(null);

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

  const saveEdit = (field) => {
    setProfile({ ...profile, [field]: editValues[field] });
    setEditMode({ ...editMode, [field]: false });
    setEditValues({ ...editValues, [field]: undefined });
    showNotification(`${field} updated successfully!`);
  };

  const handleInputChange = (field, value) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
      setShowSkillForm(false);
      showNotification('Skill added successfully!');
    }
  };

  const removeSkill = (index) => {
    const newSkills = profile.skills.filter((_, i) => i !== index);
    setProfile({ ...profile, skills: newSkills });
    showNotification('Skill removed successfully!');
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      setProfile({ ...profile, education: [...profile.education, { ...newEducation }] });
      setNewEducation({ degree: '', institution: '', year: '' });
      setShowEducationForm(false);
      showNotification('Education record added successfully!');
    }
  };

  const removeEducation = (index) => {
    const newEducationList = profile.education.filter((_, i) => i !== index);
    setProfile({ ...profile, education: newEducationList });
    showNotification('Education record removed successfully!');
  };

  const uploadDocument = async () => {
    if (!newDocumentFile) {
      showNotification("Please select a file", "error");
      return;
    }

    const formData = new FormData();
    formData.append("document", newDocumentFile);

    try {
      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const uploadedDoc = await res.json();

      setDocuments([...documents, uploadedDoc]);
      setNewDocumentFile(null);
      setShowDocumentForm(false);
      showNotification("Document uploaded successfully!");
    } catch (err) {
      console.error(err);
      showNotification("Upload failed", "error");
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
            <Edit3 size={16} />
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {notification && <Notification message={notification.message} type={notification.type} />}
      
      <div className="max-w-6xl mx-auto">
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
          {/* Left Column */}
          <div className="space-y-4">
            <EditableField field="name" label="Full Name" icon={<User size={16} />} value={profile.name} />
            <EditableField field="email" label="Email" icon={<Mail size={16} />} value={profile.email} type="email" />
            <EditableField field="contact" label="Contact Number" icon={<Phone size={16} />} value={profile.contact} type="tel" />
            <EditableField field="address" label="Address" icon={<MapPin size={16} />} value={profile.address} multiline={true} />
          </div>

          {/* Middle Column - Documents */}
          <div className="space-y-4">
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
                    type="file"
                    onChange={(e) => setNewDocumentFile(e.target.files[0])}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3"
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
                      onClick={() => {setShowDocumentForm(false); setNewDocumentFile(null);}}
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
                      <a href={`http://localhost:3000${doc.path}`} download className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-md hover:bg-blue-50">
                        <Download size={16} />
                      </a>
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

          {/* Right Column */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={16} /> Account Information
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">User ID</p>
                  <p className="font-medium text-gray-800">#{profile.id}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Account Created</p>
                  <p className="font-medium text-gray-800">{new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Last Updated</p>
                  <p className="font-medium text-gray-800">{new Date(profile.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Role</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                    {profile.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ProfilePage;