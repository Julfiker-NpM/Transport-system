import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();

  if (auth.loading) return <p>Checking authentication...</p>;
  if (!auth.user) return <Navigate to="/login" replace />;
  if (!auth.isAdmin) return <p style={{ color: "red" }}>Access denied. Admin users only.</p>;

  return children;
}
