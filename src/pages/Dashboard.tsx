import { useAuth } from "@/lib/auth-context";
import StatCard from "@/components/StatCard";
import { Users, Calendar, FileText, Activity, UserCog, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { appointments, patients, prescriptions } from "@/lib/mock-data";

function AdminDashboard() {
  const todayAppts = appointments.filter(a => a.date === "2026-02-28");
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value={patients.length} icon={Users} trend="12% vs last month" trendUp iconClassName="bg-accent text-accent-foreground" />
        <StatCard title="Today's Appointments" value={todayAppts.length} icon={Calendar} trend="3 pending" iconClassName="bg-info/10 text-info" />
        <StatCard title="Prescriptions" value={prescriptions.length} icon={FileText} trend="5 this week" trendUp iconClassName="bg-success/10 text-success" />
        <StatCard title="Active Doctors" value={3} icon={UserCog} iconClassName="bg-warning/10 text-warning" />
      </div>
      <RecentAppointmentsTable />
    </div>
  );
}

function DoctorDashboard() {
  const myAppts = appointments.filter(a => a.doctorName === "Dr. James Wilson");
  const todayAppts = myAppts.filter(a => a.date === "2026-02-28");
  const completed = myAppts.filter(a => a.status === "completed").length;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Appointments" value={todayAppts.length} icon={Calendar} iconClassName="bg-accent text-accent-foreground" />
        <StatCard title="My Patients" value={patients.length} icon={Users} iconClassName="bg-info/10 text-info" />
        <StatCard title="Completed" value={completed} icon={CheckCircle} iconClassName="bg-success/10 text-success" />
        <StatCard title="Prescriptions Written" value={prescriptions.length} icon={FileText} iconClassName="bg-warning/10 text-warning" />
      </div>
      <RecentAppointmentsTable />
    </div>
  );
}

function ReceptionistDashboard() {
  const todayAppts = appointments.filter(a => a.date === "2026-02-28");
  const pending = todayAppts.filter(a => a.status === "pending").length;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Today's Appointments" value={todayAppts.length} icon={Calendar} iconClassName="bg-accent text-accent-foreground" />
        <StatCard title="Pending Confirmation" value={pending} icon={Clock} iconClassName="bg-warning/10 text-warning" />
        <StatCard title="Registered Patients" value={patients.length} icon={Users} iconClassName="bg-info/10 text-info" />
      </div>
      <RecentAppointmentsTable />
    </div>
  );
}

function PatientDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="My Appointments" value={2} icon={Calendar} iconClassName="bg-accent text-accent-foreground" />
        <StatCard title="Prescriptions" value={1} icon={FileText} iconClassName="bg-info/10 text-info" />
        <StatCard title="Next Visit" value="Mar 1" icon={Clock} iconClassName="bg-success/10 text-success" />
      </div>
      <RecentAppointmentsTable />
    </div>
  );
}

function RecentAppointmentsTable() {
  const statusStyles: Record<string, string> = {
    confirmed: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    completed: "bg-info/10 text-info",
    cancelled: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-card animate-fade-in">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-semibold text-card-foreground">Recent Appointments</h3>
        <span className="text-xs text-muted-foreground">{appointments.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-5 py-3 font-medium text-muted-foreground">Patient</th>
              <th className="px-5 py-3 font-medium text-muted-foreground">Doctor</th>
              <th className="px-5 py-3 font-medium text-muted-foreground">Date</th>
              <th className="px-5 py-3 font-medium text-muted-foreground">Time</th>
              <th className="px-5 py-3 font-medium text-muted-foreground">Type</th>
              <th className="px-5 py-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice(0, 5).map((apt) => (
              <tr key={apt.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3 font-medium text-card-foreground">{apt.patientName}</td>
                <td className="px-5 py-3 text-muted-foreground">{apt.doctorName}</td>
                <td className="px-5 py-3 text-muted-foreground">{apt.date}</td>
                <td className="px-5 py-3 text-muted-foreground">{apt.time}</td>
                <td className="px-5 py-3 text-muted-foreground">{apt.type}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[apt.status]}`}>
                    {apt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}!</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's what's happening today at the clinic.</p>
      </div>
      {user.role === "admin" && <AdminDashboard />}
      {user.role === "doctor" && <DoctorDashboard />}
      {user.role === "receptionist" && <ReceptionistDashboard />}
      {user.role === "patient" && <PatientDashboard />}
    </div>
  );
}
