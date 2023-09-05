// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLoginMutation } from "../../reducers/auth.slice.reducer";
// import { setCredentials, logOut } from "../../reducers/auth.reducer";
// import { InputForm, ButtonForm } from "../form/form";

// export default function LoginDropdown() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [login] = useLoginMutation();
//   const dispatch = useDispatch();

//   const auth = useSelector((state) => state.auth);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeDropdown = () => {
//     setIsOpen(false);
//   };

//   const handleLogout = () => {
//     dispatch(logOut());
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
//       } catch (error) {
//         setError("Invalid username or password");
//       }
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setError("");
//   };

//   if (!!auth.token) {
//     return (
//       <div className="flex space-x-5">
//         <button onClick={handleLogout}>Logout</button>
//         <div>Dashboard</div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative inline-block text-center z-[9999]">
//       <div>
//         <button
//           onClick={toggleDropdown}
//           className="inline-flex w-full justify-center rounded-md bg-white hover:font-semibold hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
//         >
//           Login
//         </button>
//       </div>
//       {isOpen && <div className="fixed inset-0 " onClick={closeDropdown}></div>}
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-72 origin-top-right divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="px-5 py-5 space-y-2">
//             <div className="font-semibold">Login</div>
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <InputForm
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//               />
//               <InputForm
//                 type="password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 placeholder="Password"
//               />
//               {error && <span className="text-red-500 text-xs">{error}</span>}
//               <ButtonForm type="submit" text="Login" />
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
