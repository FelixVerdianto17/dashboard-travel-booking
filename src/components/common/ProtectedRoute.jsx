import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

/**
 * ProtectedRoute component that blocks unauthenticated users
 * and redirects them to the login page.
 */
const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  if (!user || !token) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render matching child routes
  return <Outlet />;
};

export default ProtectedRoute;
