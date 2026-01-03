import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import HeroSection from './components/common/HeroSection'
import HomeSection from './components/common/HomeSection'
import Login from './pages/Login'
import './App.css'

function App() {
  const [heroType, setHeroType] = useState('modern'); // 'modern' or 'classic'

  return (
    <Router>
      <Navbar currentPage="home" />

      <Routes>
        <Route path="/" element={
          <>
            {/* Toggle between Hero Sections */}
            {heroType === 'modern' ? <HeroSection /> : <HomeSection />}

            {/* Design Controls */}
            <div className='max-w-4xl mx-auto mt-8 p-6'>
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
                </div>
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-semibold text-blue-800 mb-2'>Current Setup:</h4>
                    <ul className='list-disc list-inside text-sm text-blue-700 ml-2'>
                      <li>JWT Token Management (axios + js-cookie)</li>
                      <li>Request/Response Interceptors for Auth</li>
                      <li>Role-based Navbar visibility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        } />
        
        <Route path="/login" element={<Login />} />
        
        {/* Fallback for other routes */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-bold text-gray-800">Page coming soon!</h2>
            <a href="/" className="mt-4 text-blue-600 hover:underline">Return Home</a>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
