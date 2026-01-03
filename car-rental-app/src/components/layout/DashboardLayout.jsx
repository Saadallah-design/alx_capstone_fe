import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: 'fi fi-rr-apps', path: '/dashboard' },
  { id: 'fleet', label: 'My Fleet', icon: 'fi fi-rr-car', path: '/dashboard/fleet' },
  { id: 'bookings', label: 'Bookings', icon: 'fi fi-rr-calendar', path: '/dashboard/bookings' },
  { id: 'analytics', label: 'Analytics', icon: 'fi fi-rr-stats', path: '/dashboard/analytics' },
  { id: 'profile', label: 'Agency Profile', icon: 'fi fi-rr-building', path: '/dashboard/profile' },
];

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-sm border-r border-gray-100 transition-all duration-300 flex flex-col z-20`}
      >
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <i className="fi fi-br-shield-check text-white text-xs"></i>
              </div>
              <span className="font-bold text-lg text-gray-900 tracking-tight">Agency Portal</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all"
          >
            <i className={`fi ${isSidebarOpen ? 'fi-rr-angle-small-left' : 'fi-rr-angle-small-right'} text-xl flex items-center`}></i>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1.5 px-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-200' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <i className={`${item.icon} text-lg flex items-center justify-center ${isActive ? 'text-white' : 'group-hover:text-gray-900'}`}></i>
                    {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={logout}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all w-full group`}
          >
            <i className="fi fi-rr-exit text-lg flex items-center"></i>
            {isSidebarOpen && <span className="font-semibold text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{user?.agency_name || user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
            <div className="h-10 w-10 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-gray-200">
              {user?.email?.[0].toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <section className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}
