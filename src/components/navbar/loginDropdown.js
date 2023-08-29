import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputForm, ButtonForm } from "../form/form";

export default function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") || false
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie =
      "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim().length === 0 || username.trim().length === 0) {
      setError("Field is required");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long");
    } else {
      setError("");
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}login`,
          {
            username,
            password,
          }
        );
        const data = response.data;
        if (response.status === 200) {
          localStorage.setItem("token", data.accessToken);
          document.cookie = `refresh_token=${data.refreshToken}; HttpOnly`;

          setIsAuthenticated(true);
          setUsername("");
          setPassword("");
          window.location.reload(true);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Invalid username or password");
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  if (isAuthenticated) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-center z-[9999]">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex w-full justify-center rounded-md bg-white hover:font-semibold hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Login
        </button>
      </div>
      {isOpen && <div className="fixed inset-0 " onClick={closeDropdown}></div>}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 origin-top-right divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-5 py-5 space-y-2">
            <div className="font-semibold">Login</div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputForm
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <InputForm
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
              {error && <span className="text-red-500 text-xs">{error}</span>}
              <ButtonForm type="submit" text="Login" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
