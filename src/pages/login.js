// import React, { useState } from "react";
// import { InputForm, ButtonForm } from "../components/form/form";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password.trim().length === 0 || username.trim().length === 0) {
//       setError("Field is required");
//     } else if (password.length < 8) {
//       setError("Password must be at least 8 characters long");
//     } else {
//       setError("");
//       try {
//         const response = await axios.post(
//           process.env.REACT_APP_BACKEND_BASE_URL + "login",
//           { username, password }
//         );

//         if (response.status === 200) {
//           const responseData = response.data;

//           // Simpan accessToken ke localStorage
//           localStorage.setItem("accessToken", responseData.accessToken);

//           setUsername("");
//           setPassword("");

//           navigate("/");
//         } else {
//           setError("Invalid username or password");
//         }
//       } catch (error) {
//         setError("An error occurred");
//       }
//     }
//   };

//   return (
//     <div className="w-screen h-screen bg-sky-100 flex items-center justify-center">
//       <div className="h-2/5 w-1/4 rounded-lg shadow-xl p-10 bg-white">
//         <div className="text-xl font-semibold text-left">Login</div>
//         <form
//           onSubmit={handleSubmit}
//           className=" h-full flex flex-col justify-around"
//         >
//           <div className="space-y-10">
//             <InputForm
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//             />
//             <InputForm
//               type="password"
//               value={password}
//               onChange={handlePasswordChange}
//               placeholder="Password"
//             />
//           </div>
//           <div>
//             {error && <span className="text-red-500 text-xs">{error}</span>}
//             <ButtonForm type="submit" text="Login" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { InputForm, ButtonForm } from "../components/form/form";
// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../reducers/auth.slice.reducer";
// import { setCredentials } from "../reducers/auth.reducer";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [login] = useLoginMutation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password.trim().length === 0 || username.trim().length === 0) {
//       setError("Field is required");
//     } else if (password.length < 8) {
//       setError("Password must be at least 8 characters long");
//     } else {
//       setError("");
//       try {
//         const userData = await login({ username, password }).unwrap();
//         dispatch(setCredentials({ ...userData, username }));
//         setUsername("");
//         setPassword("");

//         navigate("/");
//       } catch (error) {
//         setError("Invalid username or password");
//       }
//     }
//   };

//   return (
//     <div className="w-screen h-screen bg-sky-100 flex items-center justify-center">
//       <div className="h-2/5 w-1/4 rounded-lg shadow-xl p-10 bg-white">
//         <div className="text-xl font-semibold text-left">Login</div>
//         <form
//           onSubmit={handleSubmit}
//           className=" h-full flex flex-col justify-around"
//         >
//           <div className="space-y-10">
//             <InputForm
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//             />
//             <InputForm
//               type="password"
//               value={password}
//               onChange={handlePasswordChange}
//               placeholder="Password"
//             />
//           </div>
//           <div>
//             {error && <span className="text-red-500 text-xs">{error}</span>}
//             <ButtonForm type="submit" text="Login" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { InputForm, ButtonForm } from "../components/form/form";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
// import useToggle from "../hooks/useToggle";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth, persist, setPersist } = useAuth();
  // const [check, toggleCheck] = useToggle("persist", false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
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
          "/login",
          JSON.stringify({ username, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const accessToken = response?.data?.accessToken;
        const role = response?.data?.role;

        setAuth({ username, password, accessToken, role });

        setUsername("");
        setPassword("");
        navigate("/", { replace: true });
      } catch (error) {
        setError("Invalid username or password");
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="w-screen h-screen bg-sky-100 flex items-center justify-center">
      <div className="h-fit w-full mx-5 sm:mx-0 md:mx-0 sm:w-1/2 lg:w-1/3  rounded-lg shadow-xl p-12 bg-white">
        <div className="text-xl font-semibold text-left">Login</div>
        <form
          onSubmit={handleSubmit}
          className=" h-full flex flex-col justify-around"
        >
          <div className="space-y-5 pt-10">
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
            <div className="text-xs text-left space-x-2 items-center flex">
              <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor="persist">Remember me</label>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col items-center pt-5">
            <ButtonForm type="submit" text="Login" />
            {error && (
              <span className="absolute text-red-500 text-center text-xs pt-10 ">
                {error}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
