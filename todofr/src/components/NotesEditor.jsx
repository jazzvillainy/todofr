import React, { useContext, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router";
import supabase from "../supaBaseConfig";
import { AuthContext } from "../AuthContext";
import { IoMdClose } from "react-icons/io";
function NotesEditor() {
  // const [notesList, setNotesLIst] = useState("");
  // const notesList = localStorage.getItem("notes");
  // const notesListParse = JSON.parse(notesList);LPMA3D0H;
  // replace with context

  // try having a ternary operator in the event prop onclick={hbsbbisd? ksbfvbk: jhjafjv} for the create note button laterr
  const nav = useNavigate();
  const [noteEditorInput, setNoteEditorInput] = useState("");
  const [title, setTitle] = useState("");
  // const { id } = useParams();
  const { session } = useContext(AuthContext);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("items")
      .insert([{ title, content: noteEditorInput, user_id: session.user.id }])
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      nav("/", { replace: true });
      // replace deletes or replaces the current route from the history
    }

    // setNotesLIst([
    //   ...notesList,
    //   {
    //     id: id,
    //     title: title,
    //     dateCreated: new Date(),
    //     content: noteEditorInput,
    //   },
    // ]);
    // console.log(notesList);
  };
  const handleEditorInputChange = (e) => {
    setNoteEditorInput(e.target.value);
  };

  return (
    <div className="h-full">
      <form className="flex flex-col" action="">
        <span className="flex justify-between">
          <NavLink to="/">
            <button className="text-white">
              <IoMdClose />
            </button>
          </NavLink>
          {/* <NavLink > */}
          <button className="text-white" type="submit" onClick={handleSubmit}>
            save
          </button>
          {/* </NavLink> */}
        </span>
        <input
          placeholder="Title"
          className="w-full min-h-[200px] bg-black border-2 border-black rounded-lg shadow-sm
                           focus:outline-none
                           resize-y font-mono text-white placeholder:text-gray-500
                           dark:bg-black dark:border-black dark:text-white dark:placeholder:text-gray-500"
          onChange={handleTitleChange}
          type="text"
        />
        <textarea
          className="p-10 w-full min-h-[200px] bg-black border-2 border-black rounded-lg shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-yellow-40
                           resize-y font-mono text-white placeholder:text-gray-500
                           dark:bg-black dark:border-black dark:text-white dark:placeholder:text-gray-500"
          placeholder="Note something down"
          value={noteEditorInput}
          onChange={handleEditorInputChange}
          type="text"
        />
      </form>
    </div>
  );
}

export default NotesEditor;
