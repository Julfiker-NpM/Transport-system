import { useState } from "react";
import { addSchedule } from "../../services/busService";

export default function AddEditBus() {
  const [form, setForm] = useState({
    route_name: "",
    bus_number: "",
    departure_time: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.route_name || !form.bus_number || !form.departure_time) {
      setStatus("Please fill in every field.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await addSchedule(form);
      setStatus("Bus schedule added successfully.");
      setForm({ route_name: "", bus_number: "", departure_time: "" });
    } catch (err: any) {
      setStatus(err.message || "Could not save the schedule.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-card">
      <h2 className="page-title">Add Bus</h2>
      <div className="field-group">
        <label>
          Route
          <input
            value={form.route_name}
            placeholder="Route"
            onChange={e => setForm({ ...form, route_name: e.target.value })}
          />
        </label>
        <label>
          Bus Number
          <input
            value={form.bus_number}
            placeholder="Bus Number"
            onChange={e => setForm({ ...form, bus_number: e.target.value })}
          />
        </label>
        <label>
          Time
          <input
            value={form.departure_time}
            placeholder="Time"
            onChange={e => setForm({ ...form, departure_time: e.target.value })}
          />
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      {status && (
        <p className={status.includes("success") ? "status-success" : "status-error"}>
          {status}
        </p>
      )}
    </section>
  );
}
