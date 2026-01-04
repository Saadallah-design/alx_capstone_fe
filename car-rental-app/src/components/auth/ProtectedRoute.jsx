import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole && !(requiredRole === 'AGENCY_ADMIN' && user?.role === 'AGENCY_STAFF')) {
    // Check if they are actually an agency applicant who is just not yet approved
    // (Assuming the backend might return role='CUSTOMER' but is_approved=false for applicants)
    if (requiredRole === 'AGENCY_ADMIN' && user?.is_pending_agency) {
      return <Navigate to="/pending-approval" replace />;
    }

    console.log("Access Denied:", {
      userRole: user?.role,
      required: requiredRole,
      fullUser: user
    });
    return <Navigate to="/" replace />;
  }

  // New: Even if role matches, check if approval is required and granted
  if ((user?.role === 'AGENCY_ADMIN' || user?.role === 'AGENCY_STAFF') && user?.is_approved === false) {
    return <Navigate to="/pending-approval" replace />;
  }

  return children;
}
