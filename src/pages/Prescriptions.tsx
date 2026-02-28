import { prescriptions } from "@/lib/mock-data";
import { FileText, Download, Plus, Pill } from "lucide-react";

export default function Prescriptions() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Prescriptions</h1>
          <p className="text-sm text-muted-foreground">{prescriptions.length} prescriptions issued</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
          <Plus className="h-4 w-4" /> New Prescription
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{rx.patientName}</h3>
                  <p className="text-xs text-muted-foreground">{rx.doctorName} • {rx.date}</p>
                </div>
              </div>
              <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">Diagnosis</p>
              <p className="text-sm font-medium text-card-foreground">{rx.diagnosis}</p>
            </div>

            <div className="mt-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Pill className="h-3.5 w-3.5" /> Medicines</p>
              {rx.medicines.map((med, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="text-sm font-medium text-card-foreground">{med.name}</span>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">{med.dosage}</span>
                    <span className="ml-2 text-xs text-accent-foreground font-medium">{med.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            {rx.notes && (
              <p className="mt-3 text-xs text-muted-foreground italic border-t border-border pt-3">
                📝 {rx.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
