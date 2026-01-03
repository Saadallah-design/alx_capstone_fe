import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PendingApproval() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already approved, redirect to dashboard
    if (user?.is_approved && user?.role === 'AGENCY_ADMIN') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-center text-white">
          <div className="mx-auto h-20 w-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30 animate-pulse">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Application Pending</h2>
          <p className="mt-2 text-blue-100 opacity-90">We're reviewing your credentials</p>
        </div>

        <div className="px-8 py-10 space-y-8">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-bold text-gray-900">Registration Received</h4>
                <p className="text-xs text-gray-500 mt-1">We've successfully received your agency details for {user?.name || 'your account'}.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-gray-100 pl-4 py-1">
                <h4 className="text-sm font-bold text-gray-900">Verification in Progress</h4>
                <p className="text-xs text-gray-500 mt-1">Our team is verifying your business license and insurance documents.</p>
              </div>
            </div>

            <div className="flex items-start opacity-40">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-bold text-gray-900 text-gray-400">Dashboard Access</h4>
                <p className="text-xs text-gray-500 mt-1">You'll receive an email once your fleet management tools are active.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
            <h5 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">Estimated Time</h5>
            <p className="text-sm text-blue-900">Your application will be processed within <span className="font-bold underline decoration-blue-300">24-48 business hours</span>.</p>
          </div>

          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go back to Home
            </Link>
            <button
              onClick={logout}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Sign out
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 italic">
            Need help? Contact us at <a href="mailto:support@phuketrentals.com" className="text-blue-500 hover:underline">support@phuketrentals.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
