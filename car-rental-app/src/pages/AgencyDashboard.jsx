import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
    <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
  </div>
);

export default function AgencyDashboard() {
  const [stats, setStats] = useState({
    totalCars: 0,
    activeBookings: 0,
    monthlyEarnings: 0,
    pendingApprovals: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, this would be a single stats endpoint
        // const response = await apiClient.get('/api/agency/dashboard/stats/');
        // setStats(response.data);
        
        // Mocking for now to show UI
        setTimeout(() => {
          setStats({
            totalCars: 12,
            activeBookings: 5,
            monthlyEarnings: 45000,
            pendingApprovals: 2
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Fleet" value={stats.totalCars} icon="🚗" color="blue" />
        <StatCard title="Active Bookings" value={stats.activeBookings} icon="📅" color="emerald" />
        <StatCard title="Monthly Revenue" value={`${stats.monthlyEarnings.toLocaleString()} ฿`} icon="💰" color="purple" />
        <StatCard title="Pending Requests" value={stats.pendingApprovals} icon="⚠️" color="orange" />
      </div>

      {/* Recent Activity / Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 italic text-center py-8">No recent bookings to display.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Insights</h3>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-700 font-medium">💡 Pro Tip:</p>
            <p className="text-sm text-blue-600 mt-1">Your Toyota Fortuner is your most popular car this month. Consider adding more SUVs to your fleet!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
