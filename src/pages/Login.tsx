import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { Activity, Eye, EyeOff, ArrowRight } from "lucide-react";

const DEMO_ACCOUNTS = [
  { role: "Admin", email: "admin@clinic.com", password: "admin123" },
  { role: "Doctor", email: "doctor@clinic.com", password: "doctor123" },
  { role: "Receptionist", email: "reception@clinic.com", password: "rec123" },
  { role: "Patient", email: "patient@clinic.com", password: "patient123" },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError("");
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-primary-foreground/20"
              style={{
                width: `${200 + i * 120}px`, height: `${200 + i * 120}px`,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
            <Activity className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-extrabold text-primary-foreground mb-4">ClinicPro</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Modern clinic management platform. Digitize patient records, appointments, prescriptions & analytics.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[["500+", "Patients"], ["1,200+", "Appointments"], ["98%", "Satisfaction"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-primary-foreground">{val}</p>
                <p className="text-xs text-primary-foreground/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ClinicPro</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1.5 w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-input bg-card px-4 py-2.5 pr-10 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive font-medium">{error}</p>}

            <button
              type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <p className="text-xs font-medium text-muted-foreground mb-3">Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleDemoLogin(acc.email, acc.password)}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-card-foreground hover:bg-accent hover:text-accent-foreground transition-all text-left"
                >
                  <span className="block font-semibold">{acc.role}</span>
                  <span className="text-muted-foreground">{acc.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
