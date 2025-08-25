// src/hooks/useLogin.js
import { useState } from "react";
import axios from "axios";

export default function useLogin(baseURL = "http://localhost:3000/api") {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (role, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${baseURL}/${role}/login`, { email, password });

      // Save token if backend sends it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setUser(res.data.user || null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { login, logout, user, loading, error };
}
