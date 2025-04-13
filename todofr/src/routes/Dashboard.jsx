import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const navigate = useNavigate();

  const { session, signUpNewUser, signOut, signIn } = useContext(AuthContext);
  console.log(session);
  const handleSignOut = async () => {
    try{
      await signOut()
      navigate("/signin")
    } catch(err){
      console.log(err);
    }
  };
  return (
    <div className="w-full h-full text-center align-middle">
      <div className="text-white"> {session?.user?.email}, are you sure you want to sign out?</div>
      <div className="text-red-600" onClick={handleSignOut}>
        sign out
      </div>
    </div>
  );
};
