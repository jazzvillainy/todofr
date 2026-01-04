import { useState, useEffect, useContext } from "react";
import NoteCards from "../components/NoteCards";
import Search from "../components/Search";
import { NavLink } from "react-router";
import supabase from "../supaBaseConfig";
import { AuthContext } from "../AuthContext";

function NotesApp() {
  const [fetchData, setFetchData] = useState([]);
  const [fetchErr, setFetchErr] = useState(null);

  const { session } = useContext(AuthContext);

  // 🔹 Initial fetch + cache
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("items")
        .select()
        .eq("user_id", session.user.id);

      if (error) {
        setFetchErr("Could not fetch notes");
        console.error(error);
        return;
      }

      if (data) {
        setFetchData(data);
        localStorage.setItem("notes_cache", JSON.stringify(data));
        setFetchErr(null);
      }
    };

    fetchNotes();
  }, [session.user.id]);

  // 🔍 Search handler
  const handleSearch = async (query) => {
    // If input is empty → restore cached data
    if (!query.trim()) {
      const cached = localStorage.getItem("notes_cache");
      if (cached) {
        setFetchData(JSON.parse(cached));
      }
      return;
    }

    // Ensure cache exists before searching
    if (!localStorage.getItem("notes_cache")) {
      localStorage.setItem("notes_cache", JSON.stringify(fetchData));
    }

    const { data, error } = await supabase
      .from("items")
      .select("*")
      //  "title" || "context" always resolves to "title"
      .textSearch("title", query, {
        type: "websearch",
        config: "english",
      });

    // If search fails or returns nothing → fallback
    if (error || !data || data.length === 0) {
      const cached = localStorage.getItem("notes_cache");
      if (cached) {
        setFetchData(JSON.parse(cached));
      }
      return;
    }

    setFetchData(data);
  };

  return (
    <div className="flex flex-col items-center gap-2 h-fit pb-20">
      <div className="flex justify-between w-full h-[15dvh]">
        <h4 className="px-5 py-1 text-gray-600">
          <b>NOTES</b>
        </h4>
        <NavLink to="/dashboard" className="text-red-400">
          Sign out
        </NavLink>
      </div>

      <Search handleSearch={handleSearch} />

      {!fetchData.length && <p className="text-blue-800">take down some notes!</p>}

      {fetchErr && <p className="text-red-800">{fetchErr}</p>}

      {fetchData.map((item) => (
        <NavLink
          key={item.id}
          to={`/updator/${item.id}`}
          className="w-full flex justify-center"
        >
          <NoteCards item={item} />
        </NavLink>
      ))}

      <div className="bg-transparent w-[100dvw] h-1/5 fixed bottom-0 flex justify-center">
        <NavLink to="/notesEditor">
          <button
            className="bg-blue-800 rounded-full w-7 h-7 absolute bottom-20 sm:scale-150"
            type="button"
          >
            +
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default NotesApp;
