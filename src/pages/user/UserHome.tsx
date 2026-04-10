import { useEffect, useState } from "react";
import { getSchedules } from "../../services/busService";

export default function UserHome() {
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSchedules()
      .then(setBuses)
      .catch(err => setError(err.message || "Failed to load schedules"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page-card">
      <h2 className="page-title">Bus Schedule</h2>
      {loading && <p>Loading schedules...</p>}
      {error && <p className="status-error">{error}</p>}
      {!loading && !error && buses.length === 0 && <p>No bus schedules found.</p>}
      {buses.map(bus => (
        <div key={bus.id} className="list-item">
          <div>
            <strong>{bus.route_name}</strong>
            <p>{bus.bus_number} • {bus.departure_time}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
