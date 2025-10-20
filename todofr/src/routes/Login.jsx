import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setSession, signIn } = useContext(AuthContext);
  // console.log(session);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn(email, password);
      console.log(result);

      if (result.success) {
        setSession(result?.data?.session);
        sessionStorage.setItem(
          "usersession",
          JSON.stringify(result?.data?.session)
        );
        navigate("/notesapp");
      }
      if (result.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
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
          Login
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
          LogIn
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-center">{error.message}</p>
        )}
        <p className=" flex items-center justify-center w-full h-10">
          <NavLink to={"/signup"}>Create an account?</NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
