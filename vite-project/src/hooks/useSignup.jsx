// src/hooks/useSignup.js
import { useState } from "react";
import axios from "axios";

export default function useSignup(baseURL = "http://localhost:5000/api") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${baseURL}/register`, {
      email :formData.email,
      password : formData.password,
      name : formData.name,
      batch: formData.batch,
      });
      
      // If backend returns token, store it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setNewUser(res.data.user || null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
