import { Stethoscope, Mail, Phone, Star } from "lucide-react";

const doctors = [
  { id: "d1", name: "Dr. James Wilson", specialty: "General Medicine", email: "james@clinic.com", phone: "+92 300 1111111", patients: 45, rating: 4.8 },
  { id: "d2", name: "Dr. Amina Syed", specialty: "Cardiology", email: "amina@clinic.com", phone: "+92 321 2222222", patients: 38, rating: 4.9 },
  { id: "d3", name: "Dr. Hassan Rauf", specialty: "Dermatology", email: "hassan@clinic.com", phone: "+92 333 3333333", patients: 52, rating: 4.7 },
];

export default function Doctors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Doctors</h1>
        <p className="text-sm text-muted-foreground">{doctors.length} active doctors</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc) => (
          <div key={doc.id} className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-primary-foreground font-bold text-sm">
                {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-card-foreground">{doc.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Stethoscope className="h-3 w-3" /> {doc.specialty}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-warning" /> {doc.rating}</span>
              <span>{doc.patients} patients</span>
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {doc.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {doc.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
