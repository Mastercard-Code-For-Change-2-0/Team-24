import React, { useEffect, useState } from "react";
import { UploadCloud, CheckCircle, AlertCircle } from "lucide-react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  // Removed clerkForm state
  const [bulkFile, setBulkFile] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch users on mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("jwt"); // Replace with proper auth context
        const res = await fetch("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        setMessage("Failed to fetch users");
      }
    }
    fetchUsers();
  }, []);

  // Removed handleClerkRegister function

  // Bulk student upload
  const handleBulkUpload = async e => {
    e.preventDefault();
    if (!bulkFile) return setMessage("Please select a file");
    try {
      const token = localStorage.getItem("jwt");
      const formData = new FormData();
      formData.append("file", bulkFile);
      const res = await fetch("/api/students/bulk", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || "Bulk upload successful");
    } catch {
      setMessage("Bulk upload failed");
    }
  };

  // Message feedback with icon and color
  const renderMessage = () => {
    if (!message) return null;
    const isSuccess = message.toLowerCase().includes("success") || message.toLowerCase().includes("registered");
    return (
      <div className={`mb-6 flex justify-center animate-fade-in`}>
        <span className={`px-6 py-3 rounded-lg shadow flex items-center gap-2 font-semibold transition-all duration-300 ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {isSuccess ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {message}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            <UploadCloud size={36} className="text-blue-600 drop-shadow" />
            <h1 className="text-4xl font-bold text-blue-900 drop-shadow">Bulk Upload Portal</h1>
          </div>
          <p className="text-gray-500 text-lg">Upload students in bulk with ease.</p>
        </div>
        {renderMessage()}

  {/* Removed Clerk Registration Card and divider */}

        {/* Bulk Student Upload Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 max-w-xl mx-auto transition-transform hover:scale-[1.02]">
          <h2 className="text-2xl font-semibold mb-4 text-green-700 flex items-center gap-2">
            <UploadCloud size={24} className="text-green-400" /> Bulk Upload Students (CSV/Excel)
          </h2>
          <form className="space-y-4" onSubmit={handleBulkUpload}>
            <input
              type="file"
              accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              onChange={e => setBulkFile(e.target.files[0])}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition-colors">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;