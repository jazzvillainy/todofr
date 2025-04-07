import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate, data } from "react-router";
import supabase from "../supaBaseConfig";

export const NotesUpdator = () => {
  const nav = useNavigate();
  const [noteEditorInput, setNoteEditorInput] = useState("");
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (title || noteEditorInput) {
      setError("");
    }
  };
  //   handling submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noteEditorInput) {
      setError("cannot submit empty fields");
      return;
    }

    const { data, error } = await supabase
      .from("items")
      .update([{ id, title, content: noteEditorInput }])
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      nav("/notesapp", { replace: true });
    }

    console.log(notesList);
  };
  const handleEditorInputChange = (e) => {
    setNoteEditorInput(e.target.value);
    if (title || noteEditorInput) {
      setError("");
    }
  };
  //   fetch specific item to update
  useEffect(() => {
    const handleFetchSingleItem = async () => {
      const { data, error } = await supabase
        .from("items")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        nav("/notesapp", { replace: true, viewTransition: true });
        // i wonder wtf view transition is about
      }
      if (data) {
        setTitle(data.title);
        setNoteEditorInput(data.content);
      }
    };
    handleFetchSingleItem();
  }, []);

  return (
    <div className="h-full">
      <p className="text-red-700 w-full text-center">{error}</p>
      <form className="flex flex-col" action="">
        <span className="flex justify-between">
          <button className="text-white">discard</button>
          <NavLink to="/">
            <button className="text-white" type="submit" onClick={handleSubmit}>
              submit
            </button>
          </NavLink>
        </span>
        <input
          placeholder="title"
          value={title}
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
};
