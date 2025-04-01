import React, { useState } from "react";
import { NavLink, useParams } from "react-router";
import supabase from "../supaBaseConfig";
function NotesEditor() {
  // const [notesList, setNotesLIst] = useState("");
  // const notesList = localStorage.getItem("notes");
  // const notesListParse = JSON.parse(notesList);LPMA3D0H;
  // replace with context

  // try having a ternary operator in the event prop onclick={hbsbbisd? ksbfvbk: jhjafjv} for the create note button laterr
  const [noteEditorInput, setNoteEditorInput] = useState("");
  const [title, setTitle] = useState("");
  const { id } = useParams();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("items").insert([{title, content:noteEditorInput}]).select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
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
    console.log(notesList);
  };
  const handleEditorInputChange = (e) => {
    setNoteEditorInput(e.target.value);
  };

  return (
    <div className="h-full">
      <form className="flex flex-col" action="">
        <span className="flex justify-between">
          <button className="text-white" >
            discard
          </button>
          <NavLink to="/">
            <button className="text-white" type="submit" onClick={handleSubmit}>
              submit
            </button>
          </NavLink>
        </span>
        <input
          placeholder="title"
          // value={notesListParse
          //   .filter((item) => {
          //     return item.id !== id;
          //   })
          //   .map((item) => {
          //     item.title;
          //   })}
          onChange={handleTitleChange}
          type="text"
        />
        <input
          placeholder="notes"
          value={noteEditorInput}
          onChange={handleEditorInputChange}
          type="text"
        />
      </form>
    </div>
  );
}

export default NotesEditor;
