import React, { useState, useEffect } from "react";
import NoteCards from "../components/NoteCards";
import Search from "../components/Search";
import { data, NavLink } from "react-router";
import supabase from "../supaBaseConfig";

function NotesApp() {
  const [fetchData, setFetchData] = useState("");
  const [fetchErr, setFetchErr] = useState("");
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("item").select();
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
  console.log(fetchData.length);

  // let notes = localStorage.getItem("notes")
  // const [showInputModal, setShowInputModal] = useState(false);
  // localStorage.setItem("notes", notes);
  return (
    <div className="flex flex-col items-center gap-2 h-fit pb-20">
      <div className="w-full h-[15dvh]">
        <h1 className="text-white">Notes</h1>
      </div>

      <Search />
      {fetchErr && <p className="text-red-800">{fetchErr}</p>}
      {fetchData}
      {/* it seems to work perfectly with hardcoded data idk why */}
      {fetchData &&
        fetchData.map((item) => (
          <NavLink
            to={`/notesEditor/${item.id}`}
            className="w-full flex justify-center"
          >
            <NoteCards key={item.id} item={item} />
          </NavLink>
        ))}
      <div className="bg-transparent w-full h-1/5 fixed bottom-0 flex items-center justify-center">
        <NavLink
          to={`/notesEditor/${
            fetchData ? fetchData.length + 2 : fetchData.length + 1
          }`}
        >
          <button
            className="bg-blue-800 rounded-full w-7 h-7 absolute bottom-20 sm:scale-150"
            type="submit"
            // onClick={() => setShowNotesEditor()}
          >
            +
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default NotesApp;
