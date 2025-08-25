import React, { useState } from 'react';
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
  Briefcase
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

  const [documents, setDocuments] = useState([
    { id: 1, name: "Resume.pdf", type: "pdf", uploadDate: "2025-08-20", size: "1.2 MB" },
    { id: 2, name: "Certificate.jpg", type: "image", uploadDate: "2025-08-18", size: "856 KB" },
  ]);

  const [editMode, setEditMode] = useState({});
  const [editValues, setEditValues] = useState({});

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
  };

  const handleInputChange = (field, value) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const addSkill = () => {
    const newSkill = prompt("Enter a new skill:");
    if (newSkill && newSkill.trim()) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
    }
  };

  const removeSkill = (index) => {
    const newSkills = profile.skills.filter((_, i) => i !== index);
    setProfile({ ...profile, skills: newSkills });
  };

  const addEducation = () => {
    const degree = prompt("Enter degree/qualification:");
    const institution = prompt("Enter institution:");
    const year = prompt("Enter year:");
    
    if (degree && institution && year) {
      const newEducation = { degree, institution, year };
      setProfile({ ...profile, education: [...profile.education, newEducation] });
    }
  };

  const removeEducation = (index) => {
    const newEducation = profile.education.filter((_, i) => i !== index);
    setProfile({ ...profile, education: newEducation });
  };

  const uploadDocument = () => {
    const fileName = prompt("Enter document name (with extension):");
    if (fileName) {
      const newDoc = {
        id: documents.length + 1,
        name: fileName,
        type: fileName.includes('.pdf') ? 'pdf' : 'image',
        uploadDate: new Date().toISOString().split('T')[0],
        size: Math.random() * 2 + 0.5 + " MB"
      };
      setDocuments([...documents, newDoc]);
    }
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const EditableField = ({ field, label, icon, value, multiline = false, type = "text" }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-gray-600">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        {!editMode[field] && (
          <button
            onClick={() => startEdit(field)}
            className="text-gray-400 hover:text-blue-500 transition-colors"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          ) : (
            <input
              type={type}
              value={editValues[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
          <div className="flex gap-2">
            <button
              onClick={() => saveEdit(field)}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
            >
              <Save size={14} />
              Save
            </button>
            <button
              onClick={() => cancelEdit(field)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 capitalize">{profile.name}</h1>
              <p className="text-gray-600 capitalize flex items-center gap-2">
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
              value={profile.contact}
              type="tel"
            />
            
            <EditableField
              field="address"
              label="Address"
              icon={<MapPin size={16} />}
              value={profile.address}
              multiline={true}
            />

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={16} />
                  <span className="font-medium">Skills</span>
                </div>
                <button
                  onClick={addSkill}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="space-y-2">
                {profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                      <span className="text-gray-800">{skill}</span>
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No skills added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Middle Column - Education & Documents */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap size={16} />
                  <span className="font-medium">Education</span>
                </div>
                <button
                  onClick={addEducation}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="space-y-3">
                {profile.education.length > 0 ? (
                  profile.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{edu.degree}</p>
                          <p className="text-sm text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                        <button
                          onClick={() => removeEducation(index)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No education records added yet</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText size={16} />
                  <span className="font-medium">Documents</span>
                </div>
                <button
                  onClick={uploadDocument}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  <Upload size={14} />
                  Upload
                </button>
              </div>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-800">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size} • {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-500 hover:text-blue-600 transition-colors">
                        <Download size={14} />
                      </button>
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={16} />
                Account Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">User ID</p>
                  <p className="font-medium text-gray-800">#{profile.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Account Created</p>
                  <p className="font-medium text-gray-800">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Last Updated</p>
                  <p className="font-medium text-gray-800">
                    {new Date(profile.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Role</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                    {profile.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
                  📊 View Activity Log
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
                  🔒 Change Password
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
                  📧 Update Notifications
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-red-50 text-red-600 transition-colors text-sm">
                  🗑️ Delete Account
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