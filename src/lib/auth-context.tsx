import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "doctor" | "receptionist" | "patient";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, User & { password: string }> = {
  "admin@clinic.com": { id: "1", name: "Dr. Sarah Admin", email: "admin@clinic.com", role: "admin", password: "admin123" },
  "doctor@clinic.com": { id: "2", name: "Dr. James Wilson", email: "doctor@clinic.com", role: "doctor", password: "doctor123" },
  "reception@clinic.com": { id: "3", name: "Emily Carter", email: "reception@clinic.com", role: "receptionist", password: "rec123" },
  "patient@clinic.com": { id: "4", name: "John Doe", email: "patient@clinic.com", role: "patient", password: "patient123" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const found = MOCK_USERS[email];
    if (found && found.password === password) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
