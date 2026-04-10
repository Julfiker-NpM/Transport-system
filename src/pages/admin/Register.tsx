import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await auth.register(email, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-card" style={{ maxWidth: 460, margin: "2rem auto" }}>
      <h2 className="page-title">Register Admin</h2>
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
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p className="status-error" style={{ marginTop: "1rem" }}>{error}</p>}
    </section>
  );
}
