import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios"; // Pastikan Anda telah menginstal axios
axios.defaults.withCredentials = true;

export function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Lakukan permintaan ke server refresh-token di sini
    axios
      .post("http://localhost:8000/refresh-token")
      .then((response) => {
        console.log(response);
        setIsAuthorized(true);
      })
      .catch((error) => {
        // Jika permintaan menghasilkan status 403 (Unauthorized), pengguna tidak terautentikasi, maka set isAuthorized menjadi false
        if (error.response && error.response.status === 403) {
          setIsAuthorized(false);
        }
      });
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
