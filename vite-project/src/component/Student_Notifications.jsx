import React, { useState } from 'react';
import { Bell, Search, Filter, Eye, Trash2, Circle } from 'lucide-react';

/**
 * The Notifications component for the student portal.
 * It allows users to view, filter, and manage notifications.
 */
const Student_Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New job posting for a Data Analyst role.', category: 'Job Posting', isRead: false, date: '2025-08-25', priority: 'High' },
    { id: 2, text: 'Your mentor has reviewed your resume.', category: 'Mentorship', isRead: true, date: '2025-08-24', priority: 'Medium' },
    { id: 3, text: 'You have been shortlisted for the TechCorp interview.', category: 'Interview', isRead: false, date: '2025-08-23', priority: 'High' },
    { id: 4, text: 'Reminder: The webinar on "Building Your Professional Brand" is tomorrow.', category: 'Event', isRead: true, date: '2025-08-22', priority: 'Low' },
    { id: 5, text: 'Congratulations on completing the "IT Skills" course!', category: 'Course', isRead: false, date: '2025-08-21', priority: 'Medium' },
  ]);

  const [filter, setFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  // Filter notifications based on category and search text
  const filteredNotifications = notifications.filter(notification => {
    const matchesCategory = filter === 'all' || notification.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = notification.text.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Returns a color for the priority circle
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  // Marks a specific notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // Deletes a specific notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h2>
              <p className="text-gray-600">View and manage your alerts and updates.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">{unreadCount} unread</span>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 w-full sm:w-1/2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-1/2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="job posting">Job Posting</option>
              <option value="mentorship">Mentorship</option>
              <option value="interview">Interview</option>
              <option value="event">Event</option>
              <option value="course">Course</option>
            </select>
          </div>
        </div>
        
        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">No notifications found</p>
                <p className="text-gray-500">
                  {searchText || filter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'You\'re all caught up! New notifications will appear here.'}
                </p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <div key={notification.id} className={`p-6 flex items-start space-x-4 ${!notification.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-white hover:bg-gray-50'} transition-colors`}>
                  <div className="flex-shrink-0 mt-1">
                    <Circle
                      className={`w-3 h-3 ${getPriorityColor(notification.priority)}`}
                      fill="currentColor"
                    />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                      {notification.text}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <span>{notification.date}</span>
                      <span>•</span>
                      <span className="capitalize">{notification.category}</span>
                      <span>•</span>
                      <span className={`capitalize ${getPriorityColor(notification.priority)}`}>
                        {notification.priority} Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                        title="Mark as read"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-md transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Summary Stats */}
        {notifications.length > 0 && (
          <div className="mt-6 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{notifications.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{notifications.filter(n => n.isRead).length}</p>
                <p className="text-sm text-gray-600">Read</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
                <p className="text-sm text-gray-600">Unread</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{notifications.filter(n => n.priority === 'High').length}</p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student_Notifications;
