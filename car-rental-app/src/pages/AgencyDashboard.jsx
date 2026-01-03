import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-lg hover:border-gray-200 transition-all duration-300">
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black text-gray-900 leading-none">{value}</h3>
    </div>
    <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-2xl bg-gray-50 text-gray-900 shadow-inner group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
      <i className={`${icon} flex items-center justify-center`}></i>
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
        <StatCard title="Total Fleet" value={stats.totalCars} icon="fi fi-rr-car" />
        <StatCard title="Active Bookings" value={stats.activeBookings} icon="fi fi-rr-calendar-check" />
        <StatCard title="Monthly Revenue" value={`${stats.monthlyEarnings.toLocaleString()} ฿`} icon="fi fi-rr-money-bill-wave" />
        <StatCard title="Pending Requests" value={stats.pendingApprovals} icon="fi fi-rr-clock" />
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
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-start">
            <div className="h-10 w-10 min-w-[2.5rem] bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-md">
              <i className="fi fi-rr-lightbulb text-lg"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">Performance Insight</p>
              <p className="text-sm text-gray-500 leading-relaxed">Your Toyota Fortuner is your most popular car this month. Consider adding more SUVs to your fleet!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
