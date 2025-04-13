import React, { useState, useEffect, useContext } from "react";
import NoteCards from "../components/NoteCards";
import Search from "../components/Search";
import { data, NavLink } from "react-router";
import supabase from "../supaBaseConfig";
import { AuthContext } from "../AuthContext";
import {IoAddCircleOutline} from "react-icons/io5";
// import { UserSession } from "../AuthContext";

function NotesApp() {
  const [fetchData, setFetchData] = useState("");
  const [fetchErr, setFetchErr] = useState("");
  // const [loading, setLoading] = useState(false);
  // const {session} = UserSession()
  const { session } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("items")
        .select()
        .eq("user_id", session.user.id);
      if (error) {
        setFetchErr("could not fetch the todo list items items");
        console.log(error);
        setData("");
      }
      if (data) {
        // console.log(data);

        setFetchData(data);
        setFetchErr(null);
      }
      if (!data) {
        setLoading(true);
      }
    };
    fetchData();
    // localStorage.setItem("notes", data)
  }, []);
  // console.log(context);

  // let notes = localStorage.getItem("notes")
  // const [showInputModal, setShowInputModal] = useState(false);
  // localStorage.setItem("notes", notes);
  return (
    <div className="flex flex-col items-center gap-2 h-fit pb-20">
      <div className="flex justify-between w-full h-[15dvh]">
        <h4 className="px-5 py-1 text-gray-600">
          <b>NOTES</b>
        </h4>
        <NavLink to="/dashboard" className="text-white">
          Sign out
        </NavLink>
      </div>

      <Search />
      {/* {!fetchData.length && <p className="text-red-800">Loading...</p>} */}
      {!fetchErr && !fetchData.length && (
        <p className="text-red-800">take down some notes!</p>
      )}
      {fetchErr && <p className="text-red-800">{fetchErr}</p>}
      {/* it seems to work perfectly with hardcoded data idk why */}
      {fetchData &&
        fetchData.map((item) => (
          <NavLink
            to={`/updator/${item.id}`}
            className="w-full flex justify-center"
          >
            <NoteCards key={item.id} item={item} />
          </NavLink>
        ))}
      <div className="bg-transparent w-full h-1/5 fixed bottom-0 flex justify-center ">
        <NavLink
          to={`/notesEditor
            `}
          //   {
          //   fetchData ? fetchData.length + 1 : fetchData.length + 1
          // }
        >
          <button
            className="bg-blue-800 rounded-full w-7 h-7 absolute bottom-20 sm:scale-150"
            type="submit"
            // onClick={() => setShowNotesEditor()}
          >
            +
            {/* <IoAddCircleOutline className="bg-black text-white" /> */}
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default NotesApp;
