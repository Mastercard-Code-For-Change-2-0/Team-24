import React, { useState } from 'react';
import { BarChart2, Briefcase, Layers, Target, CheckCircle, CornerRightUp, Award, Clock } from 'lucide-react';

/**
 * Reusable Card component for displaying key metrics.
 * @param {object} props - Component props.
 * @param {string} props.title - The title of the card.
 * @param {string} props.value - The value to display.
 * @param {JSX.Element} props.icon - The icon for the card.
 * @param {string} [props.className] - Additional CSS classes.
 */
const Card = ({ title, value, icon, className = '' }) => (
  <div className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-start ${className}`}>
    <div className="text-gray-500 mb-2">{icon}</div>
    <div className="text-xl font-bold text-gray-900">{value}</div>
    <div className="text-sm text-gray-500">{title}</div>
  </div>
);

/**
 * The Dashboard component for the student portal.
 * It displays a welcome message, key metrics, recent activity, and upcoming events.
 */
const Student_Dashboard = () => {
  const [userName] = useState("Rohan Mehta");
  const [progress] = useState(75);
  const [upcomingEvents] = useState([
    { id: 1, title: 'Mock Interview Session', date: 'Oct 25', time: '10:00 AM' },
    { id: 2, title: 'Placement Drive: TechCorp India', date: 'Oct 28', time: '2:00 PM' },
    { id: 3, title: 'Soft Skills Workshop', date: 'Nov 1', time: '4:30 PM' },
  ]);
  const [recentActivity] = useState([
    { id: 1, text: 'You submitted your updated resume for review.', date: '2 hours ago', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
    { id: 2, text: 'New job posting available: "Digital Marketing Executive"', date: '5 hours ago', icon: <CornerRightUp className="w-4 h-4 text-blue-500" /> },
    { id: 3, text: 'You received a certificate for completing "Foundational IT Skills".', date: '1 day ago', icon: <Award className="w-4 h-4 text-yellow-500" /> },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome back to your career tracking portal!</p>
        </div>

        {/* Welcome Section */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            Good morning, {userName}
          </h3>
          <p className="text-gray-500 text-sm">{new Date().toDateString()}</p>
          <div className="mt-4">
            <p className="text-gray-700 font-medium">Overall Program Progress: {progress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Career Snapshot</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card title="Courses Completed" value="3/4" icon={<Layers />} />
            <Card title="Jobs Applied" value="14" icon={<Briefcase />} />
            <Card title="Interviews Attended" value="3" icon={<Target />} />
            <Card title="Skills Acquired" value="5" icon={<BarChart2 />} />
          </div>
        </div>

        {/* Recent Activity and Upcoming Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity Feed */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  {activity.icon}
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm">{activity.text}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all activity →
              </button>
            </div>
          </div>

          {/* Upcoming Events Widget */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 text-center">
                    <p className="text-xs text-blue-500 uppercase font-medium">{event.date}</p>
                    <p className="text-sm font-bold text-gray-800">{event.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium text-sm">{event.title}</p>
                  </div>
                  <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    Details
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View calendar →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="mt-6 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Briefcase className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-700">Apply for Jobs</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Award className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-700">View Certificates</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Target className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-700">Schedule Interview</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <Clock className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-700">Update Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Dashboard;