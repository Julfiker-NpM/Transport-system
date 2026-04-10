import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user && auth.isAdmin) {
      navigate("/admin");
    }
  }, [auth.user, auth.isAdmin, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await auth.login(email, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-card" style={{ maxWidth: 460, margin: "2rem auto" }}>
      <h2 className="page-title">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      {error && <p className="status-error" style={{ marginTop: "1rem" }}>{error}</p>}
      <p style={{ marginTop: "1rem", color: "var(--muted)" }}>
        Admin accounts must be pre-created in Firebase. Ask the owner for credentials.
      </p>
    </section>
  );
}
