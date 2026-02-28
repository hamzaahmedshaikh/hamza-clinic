import { useState } from "react";
import { patients } from "@/lib/mock-data";
import { Search, Plus, User, Phone, Mail, Droplets } from "lucide-react";

export default function Patients() {
  const [search, setSearch] = useState("");
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Patients</h1>
          <p className="text-sm text-muted-foreground">{patients.length} registered patients</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
          <Plus className="h-4 w-4" /> Add Patient
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients..."
          className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((patient) => (
          <div key={patient.id} className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold text-sm">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-card-foreground truncate">{patient.name}</h3>
                <p className="text-xs text-muted-foreground">{patient.age}y • {patient.gender}</p>
              </div>
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground flex items-center gap-1">
                <Droplets className="h-3 w-3" /> {patient.bloodGroup}
              </span>
            </div>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {patient.phone}</div>
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {patient.email}</div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-card-foreground hover:bg-muted transition-colors">
                View Profile
              </button>
              <button className="flex-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground hover:bg-accent/80 transition-colors">
                Book Appt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
