import React, { useState } from "react";
import { NavLink, useParams } from "react-router";

function NotesEditor() {
  // const [notesList, setNotesLIst] = useState("");
  // replace with context

  // try having a ternary operator in the event prop onclick={hbsbbisd? ksbfvbk: jhjafjv} for the create note button laterr
  const [noteEditorInput, setNoteEditorInput] = useState("");
  const [title, setTitle] = useState("");
  const { id } = useParams();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setNotesLIst([
      ...notesList,
      {
        // id: notesList.length + 1,
        id: id,
        title: title,
        dateCreated: new Date(),
        content: noteEditorInput,
      },
    ]);
    console.log(notesList);
  };
  const handleEditorInputChange = (e) => {
    setNoteEditorInput(e.target.value);
  };

  return (
    <div className="h-full">
      <form className="flex flex-col" action="">
        <span className="flex justify-between">
          <button className="text-white" onClick={() => {}}>
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
          value={notesList
            .filter((item) => {
              return item.id !== id;
            })
            .map((item) => {
              return item.title;
            })}
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
