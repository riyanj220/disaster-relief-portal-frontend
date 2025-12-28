import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, profile, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role doesn't match, send to home/unauthorized
  if (allowedRoles && !allowedRoles.includes(profile?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
