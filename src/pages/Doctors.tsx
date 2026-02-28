import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Stethoscope, Mail, ClipboardList, Shield, UserCog } from "lucide-react";
import { toast } from "sonner";

const ROLE_ICONS: Record<string, React.ElementType> = {
  doctor: Stethoscope,
  receptionist: ClipboardList,
  admin: Shield,
  patient: UserCog,
};

const ROLE_LABELS: Record<string, string> = {
  doctor: "Doctor",
  receptionist: "Receptionist",
  admin: "Administrator",
  patient: "Patient",
};

export default function Doctors() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isAdmin = user?.role === "admin";

  const { data: doctors = [], isLoading: loadingDoctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data } = await supabase.rpc("get_doctors");
      return data || [];
    },
  });

  const { data: receptionists = [], isLoading: loadingReceptionists } = useQuery({
    queryKey: ["receptionists"],
    queryFn: async () => {
      const { data } = await supabase.rpc("get_receptionists");
      return data || [];
    },
  });

  const { data: allStaff = [], isLoading: loadingStaff } = useQuery({
    queryKey: ["all-staff"],
    queryFn: async () => {
      const { data } = await (supabase.rpc as any)("get_all_staff");
      return data || [];
    },
    enabled: isAdmin,
  });

  const changeRole = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
      const { error } = await (supabase.rpc as any)("update_user_role", {
        _target_user_id: userId,
        _new_role: newRole,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
      queryClient.invalidateQueries({ queryKey: ["all-staff"] });
      toast.success("Role updated successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const StaffCard = ({ person, role }: { person: any; role: string }) => {
    const Icon = ROLE_ICONS[role] || UserCog;
    return (
      <div className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all animate-fade-in">
        <div className="flex items-start gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-sm ${role === "doctor" ? "gradient-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
            {person.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?"}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground">{person.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Icon className="h-3 w-3" /> {ROLE_LABELS[role] || role}
            </p>
          </div>
        </div>
        {person.phone && (
          <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
            <Mail className="h-3.5 w-3.5" /> {person.phone}
          </div>
        )}
        {isAdmin && person.user_id !== user?.id && (
          <div className="mt-3 pt-3 border-t border-border">
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Change Role</label>
            <select
              value={role}
              onChange={(e) => {
                if (confirm(`Change ${person.name}'s role to ${ROLE_LABELS[e.target.value]}?`)) {
                  changeRole.mutate({ userId: person.user_id, newRole: e.target.value });
                }
              }}
              disabled={changeRole.isPending}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
      </div>
    );
  };

  // Admin sees unified staff management view
  if (isAdmin) {
    const staffByRole = {
      doctor: allStaff.filter((s: any) => s.role === "doctor"),
      receptionist: allStaff.filter((s: any) => s.role === "receptionist"),
      admin: allStaff.filter((s: any) => s.role === "admin"),
      patient: allStaff.filter((s: any) => s.role === "patient"),
    };

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
          <p className="text-sm text-muted-foreground">{allStaff.length} total users • Change roles below</p>
        </div>

        {loadingStaff ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-44 rounded-xl border border-border bg-card animate-pulse" />)}
          </div>
        ) : (
          <>
            {(["doctor", "receptionist", "admin", "patient"] as const).map((role) => (
              staffByRole[role].length > 0 && (
                <div key={role}>
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    {React.createElement(ROLE_ICONS[role], { className: "h-4.5 w-4.5" })}
                    {ROLE_LABELS[role]}s
                    <span className="text-xs font-normal text-muted-foreground">({staffByRole[role].length})</span>
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {staffByRole[role].map((person: any) => (
                      <StaffCard key={person.user_id} person={person} role={role} />
                    ))}
                  </div>
                </div>
              )
            ))}
          </>
        )}
      </div>
    );
  }

  // Non-admin view: just doctors and receptionists
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground">Doctors</h1>
          <p className="text-sm text-muted-foreground">{doctors.length} active doctors</p>
        </div>
        {loadingDoctors ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => <div key={i} className="h-40 rounded-xl border border-border bg-card animate-pulse" />)}
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No doctors registered yet.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doc: any) => (
              <StaffCard key={doc.user_id} person={doc} role="doctor" />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Receptionists</h2>
          <p className="text-sm text-muted-foreground">{receptionists.length} active receptionists</p>
        </div>
        {loadingReceptionists ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(2)].map((_, i) => <div key={i} className="h-40 rounded-xl border border-border bg-card animate-pulse" />)}
          </div>
        ) : receptionists.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No receptionists registered yet.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {receptionists.map((rec: any) => (
              <StaffCard key={rec.user_id} person={rec} role="receptionist" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
