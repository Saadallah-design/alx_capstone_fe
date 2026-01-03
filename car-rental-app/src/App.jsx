import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import HeroSection from './components/common/HeroSection'
import HomeSection from './components/common/HomeSection'
import Login from './pages/Login'
import Register from './pages/Register'
import AgencyApplication from './pages/AgencyApplication'
import PendingApproval from './pages/PendingApproval'
import AgencyDashboard from './pages/AgencyDashboard'
import FleetManagement from './pages/dashboard/FleetManagement'
import BookingManagement from './pages/dashboard/BookingManagement'
import ProtectedRoute from './components/auth/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'
import './App.css'

function App() {
  const [heroType, setHeroType] = useState('modern'); // 'modern' or 'classic'

  return (
    <Router>
      <Routes>
        {/* Public Routes with Main Navbar */}
        <Route path="/" element={
          <>
            <Navbar currentPage="home" />
            {/* Toggle between Hero Sections */}
            {heroType === 'modern' ? <HeroSection /> : <HomeSection />}

            {/* Design Controls */}
            <div className='max-w-4xl mx-auto mt-8 p-6'>
              {/* (Existing design controls remain the same) */}
              <div className='bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-6'>
                <h2 className='text-xl font-bold text-purple-900 mb-4'>🎨 Hero Section Design Comparison</h2>
                <div className='flex flex-wrap gap-3'>
                  <button
                    onClick={() => setHeroType('modern')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      heroType === 'modern' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    ✨ Modern Design
                  </button>
                  <button
                    onClick={() => setHeroType('classic')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      heroType === 'classic' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    🎯 Classic Design
                  </button>
                </div>
              </div>

              <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
                <h3 className='text-lg font-bold text-blue-900 mb-3'>📋 Development Progress</h3>
                <p className='text-blue-700 mb-4'>The app is now connected to the Authentication Context. Use real API credentials to test login states.</p>
                <div className='flex flex-wrap gap-3 mb-6'>
                  <a href="/login" className='px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'>Go to Login Page</a>
                  <a href="/register" className='px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors'>Go to Register Page</a>
                  <a href="/dashboard" className='px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors'>Go to Agency Dashboard</a>
                </div>
              </div>
            </div>
          </>
        } />
        
        <Route path="/login" element={
          <>
            <Navbar currentPage="login" />
            <Login />
          </>
        } />

        <Route path="/register" element={
          <>
            <Navbar currentPage="register" />
            <Register />
          </>
        } />

        <Route path="/pending-approval" element={
          <>
            <Navbar currentPage="pending" />
            <PendingApproval />
          </>
        } />

        <Route path="/apply-agency" element={
          <>
            <Navbar currentPage="apply" />
            <AgencyApplication />
          </>
        } />

        {/* Protected Agency Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="AGENCY_ADMIN">
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AgencyDashboard />} />
          <Route path="fleet" element={<FleetManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="analytics" element={<div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 italic text-gray-400">Analytics reports coming soon...</div>} />
          <Route path="profile" element={<div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 italic text-gray-400">Agency profile settings coming soon...</div>} />
        </Route>
        
        {/* Fallback for other routes */}
        <Route path="*" element={
          <>
            <Navbar currentPage="none" />
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <h2 className="text-2xl font-bold text-gray-800">Page coming soon!</h2>
              <a href="/" className="mt-4 text-blue-600 hover:underline">Return Home</a>
            </div>
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
