import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router";

export const Privateroute = ({ children }) => {
//   const { session } = useContext(AuthContext);
  const session = sessionStorage.getItem("usersession");
  if (session == undefined) {
    return <div>loading...</div>;
  }
  return <div>{session ? <div>{children}</div> : <Navigate to={"/"} />}</div>;
};
