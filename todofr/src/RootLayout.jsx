import React from "react";
import { NavLink, Outlet } from "react-router";
import { TbNotes } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import { useParams } from "react-router";
import { useLocation } from "react-router";

function RootLayout() {
  const currentLoc = useLocation()
  // console.log(currentLoc);
  
  return (
    <div className="bg-black">
      <Outlet />
      {currentLoc.pathname == "/" || currentLoc.pathname == "/signin" ? (
        ""
      ) : (
        <div className="h-[10%] w-full bg-white bg-opacity-5 fixed bottom-0 flex">
          <NavLink
            to="/notesapp"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 border-b-2 border-blue-500 w-[50%]"
                : "text-white hover:text-blue-500 w-[50%]"
            }
          >
            {" "}
            <span className="w-full h-full flex justify-center items-center">
              <TbNotes className="w-[35%] h-[35%]" />
            </span>
          </NavLink>

          <NavLink
            to="/todos"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 border-b-2 border-blue-500 w-[50%]"
                : "text-white hover:text-blue-500 w-[50%]"
            }
          >
            <span className="w-full h-full flex justify-center items-center">
              <GrStatusGood className="w-[35%] h-[35%]" />
            </span>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default RootLayout;
