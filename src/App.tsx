import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddEditBus from "./pages/admin/AddEditBus";
import Login from "./pages/admin/Login";
import UserHome from "./pages/user/UserHome";
import NextBus from "./pages/user/NextBus";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppRoutes() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-logo">Transport System</div>
        <nav className="app-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/next" className="nav-link">Next Bus</Link>
          {isAdmin && (
            <>
              <Link to="/admin" className="nav-link">Admin</Link>
              <Link to="/admin/add" className="nav-link">Add Bus</Link>
            </>
          )}
          {!user ? (
            <Link to="/login" className="nav-link">Login</Link>
          ) : (
            <button
              onClick={async () => {
                await logout();
                navigate("/");
              }}
              className="nav-button"
            >
              Sign Out
            </button>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/next" element={<NextBus />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add"
          element={
            <ProtectedRoute>
              <AddEditBus />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
