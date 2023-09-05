import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function NavbarItems() {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const [permission, setPermission] = useState();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/current-user", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setPermission(response.data.group.permission);
    };
    fetchData();
  }, []);
  return (
    <div className="flex w-fit space-x-10 text-sm">
      {/* <Link to={"/about"}>About</Link> */}
      <div className="flex space-x-5">
        <div>Selamat datang, {auth.username}</div>
        {auth.role === "superuser" && (
          <Link
            className="hover:font-semibold hover:text-blue-600 duration-300"
            to={"dashboard"}
          >
            Dashboard
          </Link>
        )}
        {permission === "edit" && (
          <button className="hover:font-semibold hover:text-blue-600 duration-300">
            Upload/Tambah Data
          </button>
        )}
        <button
          onClick={signOut}
          className="hover:font-semibold hover:text-blue-600 duration-300"
        >
          Logout
        </button>
        <div hidden>Dashboard</div>
      </div>
    </div>
  );
}
