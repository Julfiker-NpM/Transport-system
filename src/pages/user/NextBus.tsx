import { useEffect, useState } from "react";
import { getSchedules } from "../../services/busService";
import { getNextBus } from "../../utils/getNextBus";

export default function NextBus() {
  const [buses, setBuses] = useState<any[]>([]);
  const [route, setRoute] = useState("Mirpur");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSchedules()
      .then(setBuses)
      .catch(err => setError(err.message || "Failed to load schedules"))
      .finally(() => setLoading(false));
  }, []);

  const next = getNextBus(buses, route);

  return (
    <section className="page-card">
      <h2 className="page-title">Next Bus</h2>
      <div className="field-group">
        <label>
          Route
          <input value={route} onChange={e => setRoute(e.target.value)} />
        </label>
      </div>
      {loading && <p>Loading schedules...</p>}
      {error && <p className="status-error">{error}</p>}
      {!loading && !error && (
        next ? (
          <div className="list-item">
            <div>
              <p><strong>{next.bus_number}</strong></p>
              <p>{next.departure_time}</p>
            </div>
          </div>
        ) : (
          <p>No upcoming bus</p>
        )
      )}
    </section>
  );
}
