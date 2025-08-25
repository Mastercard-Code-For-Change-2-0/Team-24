import React, { useState } from 'react';
import {
  Home,
  User,
  Settings,
  Menu,
  X,
  ChevronLeft,
  LayoutDashboard,
  FileText,
  Bell,
  LogOut,
  BarChart3
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { id: 'home', label: 'Home', icon: <Home size={20} />, path: '/home' },
  { id: 'profile', label: 'Profile', icon: <User size={20} />, path: '/profile' },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, path: '/analytics' },
  { id: 'documents', label: 'Documents', icon: <FileText size={20} />, path: '/documents' },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, path: '/notifications' },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-md p-2 shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-lg z-50 transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'w-16' : 'w-64'}
          lg:translate-x-0 lg:static lg:z-auto
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          )}
          <button
            onClick={toggleCollapse}
            className="hidden lg:block p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft 
              size={20} 
              className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Navigation */}

    <ul className="space-y-2">
  {navItems.map((item) => (
    <li key={item.id}>
      <NavLink
to={item.id === "dashboard" ? "/student" : `/student${item.path}`}        className={({ isActive }) => `
          w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
          ${isActive 
            ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }
          ${isCollapsed ? 'justify-center' : ''}
        `}
        title={isCollapsed ? item.label : ''}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        {!isCollapsed && <span className="font-medium">{item.label}</span>}
      </NavLink>
    </li>
  ))}
</ul>

        {/* Footer */}
        <div className="p-4 border-t flex-shrink-0">
          <button
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
              text-red-600 hover:bg-red-50 hover:text-red-700
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      
    </>
  );
};

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
    </div>
  );
}