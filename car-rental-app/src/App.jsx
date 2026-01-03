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
import SearchResults from './pages/SearchResults'
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
              <div className='bg-gray-50 border border-gray-100 rounded-3xl p-8 mb-8'>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <i className="fi fi-rr-settings-sliders text-sm"></i>
                  </div>
                  <h2 className='text-lg font-black text-gray-900 uppercase tracking-widest'>Hero Section Controls</h2>
                </div>
                <div className='flex flex-wrap gap-3 font-sans'>
                  <button
                    onClick={() => setHeroType('modern')}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 text-sm ${
                      heroType === 'modern' ? 'bg-gray-900 text-white shadow-xl shadow-gray-200 scale-105' : 'bg-white text-gray-500 border border-gray-100 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Modern Layout
                  </button>
                  <button
                    onClick={() => setHeroType('classic')}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 text-sm ${
                      heroType === 'classic' ? 'bg-gray-900 text-white shadow-xl shadow-gray-200 scale-105' : 'bg-white text-gray-500 border border-gray-100 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Classic Layout
                  </button>
                </div>
              </div>

              <div className='bg-white border border-gray-100 shadow-sm rounded-3xl p-8'>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 italic font-black">
                    i
                  </div>
                  <h3 className='text-lg font-black text-gray-900 uppercase tracking-widest'>Status Update</h3>
                </div>
                <p className='text-gray-500 mb-6 text-sm font-medium leading-relaxed'>The application is synchronized with the Authentication Context. Use real API credentials to validate state transitions and role-based access.</p>
                <div className='flex flex-wrap gap-3 mb-2'>
                  <a href="/login" className='px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all'>Login Portal</a>
                  <a href="/register" className='px-5 py-2.5 bg-gray-50 text-gray-900 border border-gray-100 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all'>Registration</a>
                  <a href="/dashboard" className='px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all'>Agency Dashboard</a>
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

        <Route path="/search" element={
          <>
            <Navbar currentPage="search" />
            <SearchResults />
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
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <i className="fi fi-rr-construction text-3xl text-gray-300"></i>
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">PAGE UNDER CONSTRUCTION</h2>
              <p className="text-gray-500 mb-8 max-w-sm">We're currently refining this experience. Stay tuned for updates.</p>
              <a href="/" className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200">
                Return to Safety
              </a>
            </div>
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
