import React, { createContext, useState, useEffect, useContext } from "react";

import * as SecureStore from "expo-secure-store";

import axios from "axios";

import { ROOT_URL } from "@/utils/routes";

interface Employee {
  id: number;
  unique_code: string;
  name: string;
  mobile: string;
  email: string;
  type: string;
}

interface AuthData {
  employee: Employee;
  regional_managers: Employee[];
  area_sales_managers: Employee[];
  branch_managers: Employee[];
  sales_managers: Employee[];
  agents: Employee[];
}

interface AuthResponse {
  status: boolean;
  message: string;
  access_token: string;
  error_code: boolean | null;
  error_message: string | null;
  data: AuthData;
  policies_amount: number;
  dsr_count: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userData: AuthData | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState<AuthData | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");

        const storedUserData = await SecureStore.getItemAsync("userData");

        if (token) {
          setAccessToken(token);
          setIsAuthenticated(true);

          if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${ROOT_URL}/login`, {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200 && data.status === true) {
        console.log("Login Data...", JSON.stringify(data, null, 2));

        await SecureStore.setItemAsync("authToken", data.access_token);
        await SecureStore.setItemAsync("userData", JSON.stringify(data.data));

        setAccessToken(data.access_token);
        setUserData(data.data);
        setIsAuthenticated(true);
      } else {
        throw new Error(data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // SUMAN : CLEAR THE ASYNC STORAGE AND RESET THE STATES
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");

      await SecureStore.deleteItemAsync("userData");

      setIsAuthenticated(false);

      setUserData(null);

      setAccessToken(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading,
        userData,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
