import { createContext, useContext, useState, type ReactNode } from "react";
import axiosInstance from "../api/axiosInstance";
import type { User, RegisterData } from "../types/user";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    const { data } = await axiosInstance.post<User>("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const register = async (payload: RegisterData) => {
    const { data } = await axiosInstance.post<User>("/auth/register", payload);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
