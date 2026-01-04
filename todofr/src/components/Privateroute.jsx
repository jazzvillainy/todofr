import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router";

export const Privateroute = ({ children }) => {
  const { session } = useContext(AuthContext);
  const sess = sessionStorage.getItem("usersession") || session;
  // if (sess == undefined) {
  //   return (
  //     <div className=" h-10 w-full relative">
  //       <div
  //         style={{
  //           position: "absolute",
  //           left: 0,
  //           top: 0,
  //           height: "100%",
  //           background: "green",
  //           animation: "growBar 4s linear forwards",
  //           width: "0%",
  //         }}
  //         className="loading-bar"
  //       ></div>
  //       {/* <span className="absolute bg-red-400 h-4 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
  //         loading...
  //       </span> */}
  //       <style>
  //         {`
  //       @keyframes growBar {
  //         from { width: 0%; }
  //         to { width: 100%; }
  //       }
  //       .loading-bar {
  //         z-index: 1;
  //       }
  //       `}
  //       </style>
  //     </div>
  //   );
  // }
  return (
    <div>{session ? <div>{children}</div> : <Navigate to={"/signin"} />}</div>
  );
};

Privateroute.propTypes = {
  children: PropTypes.node.isRequired,
};
