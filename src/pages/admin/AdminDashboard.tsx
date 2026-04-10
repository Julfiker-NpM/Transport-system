import { useEffect, useState } from "react";
import { getSchedules, deleteSchedule } from "../../services/busService";

export default function AdminDashboard() {
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSchedules = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getSchedules();
      setBuses(data);
    } catch (err: any) {
      setError(err.message || "Failed to load schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSchedules();
  }, []);

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      await deleteSchedule(id);
      setBuses(prev => prev.filter(bus => bus.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete schedule");
    }
  };

  return (
    <section className="page-card">
      <h2 className="page-title">Admin Dashboard</h2>
      {loading && <p>Loading schedules...</p>}
      {error && <p className="status-error">{error}</p>}
      {!loading && !error && buses.length === 0 && <p>No bus schedules found.</p>}
      {buses.map(bus => (
        <div key={bus.id} className="list-item">
          <div>
            <strong>{bus.route_name}</strong>
            <p>{bus.bus_number} • {bus.departure_time}</p>
          </div>
          <button className="btn btn-danger" onClick={() => handleDelete(bus.id)}>
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}
