import React, { useState } from "react";

function NotesEditor() {
  const [notesList, setNotesLIst] = useState("");
  const [noteEditorInput, setNoteEditorInput] = useState("");
  const [title, setTitle] = useState("");
  const handleTitleChange = () => {
    setTitle(e.target.value);
  };
  const handleSubmit = () => {
    setNotesLIst([
      ...notesList,
      {
        id: notesList.length + 1,
        title: title,
        dateCreated: new Date(),
        content: noteEditorInput,
      },
    ]);
  };
  const handleEditorInputChange = () => {
    // probaly need that e
    setNoteEditorInput(e.target.value);
  };

  return (
    <div>
      <button onClick={handleSubmit}>submit</button>
      <button onClick={() => {}}>discard</button>
      <form action="">
        <input value={title} onChange={handleTitleChange} type="text" />
        <input
          value={noteEditorInput}
          onChange={handleEditorInputChange}
          type="text"
        />
      </form>
    </div>
  );
}

export default NotesEditor;
