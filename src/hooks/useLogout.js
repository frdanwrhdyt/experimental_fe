import axios from "../api/axios";
import useAuth from "./useAuth";
import { useDispatch } from "react-redux";
import { removeOverlay } from "../actions/overlay.action";

const useLogout = () => {
  const { setAuth } = useAuth();
  const dispatch = useDispatch();
  const logout = async () => {
    setAuth({});
    dispatch(removeOverlay());
    try {
      await axios.get("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
