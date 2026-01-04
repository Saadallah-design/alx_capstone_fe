import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import AgencyApplication from './pages/AgencyApplication'
import PendingApproval from './pages/PendingApproval'
import AgencyDashboard from './pages/AgencyDashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'
import FleetManagement from './pages/dashboard/FleetManagement'
import BookingManagement from './pages/dashboard/BookingManagement'
import BookingSuccess from './pages/BookingSuccess'
import PaymentPage from './pages/PaymentPage'
import BranchManagement from './pages/dashboard/BranchManagement'
import SearchResults from './pages/SearchResults'
import VehicleDetails from './pages/VehicleDetails'
import MyBookings from './pages/MyBookings'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import HowItWorksPage from './pages/HowItWorksPage'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Main Navbar */}
        <Route path="/" element={
          <>
            <Navbar currentPage="home" />
            <HomePage />
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

        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />

        <Route path="/vehicles/:slug" element={
          <>
            <Navbar currentPage="search" />
            <VehicleDetails />
          </>
        } />

        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        {/* Backend Redirect Compatibility Route */}
        <Route path="/rentals/booking/:id/success/" element={<BookingSuccess />} />
        <Route path="/rentals/booking/:id/cancel/" element={<MyBookings />} />

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
          <Route path="branches" element={<BranchManagement />} />
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
