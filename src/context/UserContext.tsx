"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ortherUser } from "../types/User";

type UserContextType = {
  user: ortherUser | null;
  setUser: (user: ortherUser | null) => void;
  updateUserField: <K extends keyof ortherUser>(
    field: K,
    value: ortherUser[K]
  ) => void;
  loading: boolean; // ✅ thêm trạng thái loading
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<ortherUser | null>(null);
  const [loading, setLoading] = useState(true); // ✅ mặc định đang load

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false); // ✅ kết thúc load
  }, []);

  const setUser = (user: ortherUser | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(user);
  };

  const updateUserField = <K extends keyof ortherUser>(
    field: K,
    value: ortherUser[K]
  ) => {
    setUserState((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, [field]: value };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserField, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
