import React, { useState } from 'react'; 
import { Upload, FileText, Download, Trash2, File, Image } from 'lucide-react';

/**
 * A React component for a document upload and management interface.
 * It includes a drag-and-drop area and a list of uploaded documents.
 * The component simulates the upload process with a setTimeout.
 */
const Student_Documents = () => {
  // State to hold the list of documents
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Resume.pdf',
      size: '1.2 MB',
      date: '2025-08-20',
      type: 'pdf'
    },
    {
      id: 2,
      name: 'Certificate.jpg',
      size: '856 KB',
      date: '2025-08-18',
      type: 'image'
    }
  ]);

  // State to manage the drag-and-drop active state for styling
  const [dragActive, setDragActive] = useState(false);
  // State to show the uploading spinner
  const [uploading, setUploading] = useState(false);

  /**
   * Handles the drag events (dragenter, dragover, dragleave) for the drop area.
   * Prevents default behavior to enable dropping and updates the dragActive state for styling.
   * @param {DragEvent} e - The drag event object.
   */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  /**
   * Handles the file drop event.
   * Prevents default behavior, resets the dragActive state, and processes the dropped files.
   * @param {DragEvent} e - The drop event object.
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  /**
   * Processes the selected or dropped files.
   * Simulates an upload delay and then adds the new documents to the state.
   * @param {FileList} files - The list of files to be handled.
   */
  const handleFiles = (files) => {
    setUploading(true);

    // Simulate upload process with a timeout
    setTimeout(() => {
      Array.from(files).forEach((file) => {
        const newDocument = {
          id: documents.length + Math.random(),
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          date: new Date().toISOString().split('T')[0],
          type: getDocumentType(file.name)
        };
        // Use functional state update to safely add new documents
        setDocuments(prev => [...prev, newDocument]);
      });
      setUploading(false);
    }, 1500);
  };

  /**
   * Determines the document type based on the file extension.
   * @param {string} filename - The name of the file.
   * @returns {string} The type of the document (e.g., 'pdf', 'image', 'word').
   */
  const getDocumentType = (filename) => {
    const ext = filename.toLowerCase().split('.').pop();
    if (['pdf'].includes(ext)) return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
    if (['doc', 'docx'].includes(ext)) return 'word';
    if (['xls', 'xlsx'].includes(ext)) return 'excel';
    return 'document';
  };

  /**
   * Deletes a document from the list based on its ID.
   * @param {number} id - The unique ID of the document to be deleted.
   */
  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  /**
   * Returns the appropriate Lucide icon for a given document type.
   * @param {string} type - The type of the document.
   * @returns {JSX.Element} The Lucide icon component.
   */
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-green-500" />;
      case 'word':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'excel':
        return <FileText className="w-5 h-5 text-green-600" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Documents</h2>
          <p className="text-gray-600">Upload and manage your documents</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upload Documents</h3>
            <label className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors inline-flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Upload
              <input
                type="file"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.xls,.xlsx,.txt"
              />
            </label>
          </div>

          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-medium text-gray-700">Uploading...</p>
                <p className="text-sm text-gray-500">Please wait while we process your files</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-16 h-16 text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-700 mb-2">Drop your documents here</h4>
                <p className="text-gray-500 mb-4">
                  or click "Upload" to browse your files
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">DOC</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">DOCX</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">JPG</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">PNG</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">XLS</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Maximum file size: 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">My Documents ({documents.length})</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {documents.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No documents uploaded yet</p>
                <p className="text-sm text-gray-400">Upload your first document to get started</p>
              </div>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-gray-900 mb-1">
                          {doc.name}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Documents;
