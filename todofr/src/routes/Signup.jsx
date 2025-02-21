import React, { useState } from "react";
import supabase from "../supaBaseConfig";
import { UserAuth } from "../AuthContext";
// import { Navigate } from "react-router";
import { NavLink, useNavigate } from "react-router";

function Signup() {
    const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const { session, signUpNewUser } = UserAuth();
  console.log(session);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        navigate("/notesapp");
      }
    } catch (error) {
      setError("an error occurred ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <form
        className="bg-black-900 p-8 rounded-lg shadow-lg w-80"
        action=""
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          Sign Up
        </h2>

        <div className="mb-4">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Sign Up
        </button>

        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
        <NavLink to={"/signin"}>Already have an account? Log in</NavLink>
      </form>
    </div>

    // <div>
    //   <form className="flex flex-col" action="" onSubmit={handleSubmit}>
    //     <input
    //       placeholder="Email"
    //       type="Email"
    //       value={email}
    //       onChange={(e) => {
    //         setEmail(e.target.value);
    //       }}
    //     />
    //     <input
    //       placeholder="Password"
    //       type="Password"
    //       value={password}
    //       onChange={(e) => {
    //         setPassword(e.target.value);
    //       }}
    //     />
    //     <button type="submit" className="bg-green-950">
    //       Sign Up
    //     </button>
    //     {error && <p>{error}</p>}
    //   </form>
    // </div>
  );
}

export default Signup;
