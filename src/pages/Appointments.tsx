import { useState } from "react";
import { appointments } from "@/lib/mock-data";
import { Search, Plus, Calendar } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  completed: "bg-info/10 text-info",
  cancelled: "bg-destructive/10 text-destructive",
};

export default function Appointments() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = appointments
    .filter(a => filter === "all" || a.status === filter)
    .filter(a => a.patientName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
          <p className="text-sm text-muted-foreground">{appointments.length} total appointments</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
          <Plus className="h-4 w-4" /> Book Appointment
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name..."
            className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map(s => (
            <button
              key={s} onClick={() => setFilter(s)}
              className={`rounded-lg px-3 py-2 text-xs font-medium capitalize transition-all ${
                filter === s ? "gradient-primary text-primary-foreground" : "border border-border bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card animate-fade-in overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Patient</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Doctor</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Time</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => (
                <tr key={apt.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-card-foreground">{apt.patientName}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{apt.doctorName}</td>
                  <td className="px-5 py-3.5 text-muted-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{apt.date}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{apt.time}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{apt.type}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground hover:bg-accent/80 transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
