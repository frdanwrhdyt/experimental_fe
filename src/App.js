import React from "react";
import Index from "./pages";
import About from "./pages/about";
import Login from "./pages/login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./utils/persistLogin";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./utils/requireAuth";
import Layout from "./layout/index";
import Admin from "./pages/admin";
import TableDetail from "./pages/table";
// import Test from "./pages/test";

export default function App() {
  return (
    // <div className="bg-gray-100">
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["user", "superuser"]} />}>
            <Route path="" element={<Index />} />
            {/* <Route path="test" element={<Test />} /> */}
            <Route path="about" element={<About />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["superuser"]} />}>
            <Route path="dashboard" element={<Admin />} />
            <Route path="table/:tableName" element={<TableDetail />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    // </div>
  );
}
