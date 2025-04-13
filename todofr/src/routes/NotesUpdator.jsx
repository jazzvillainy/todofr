import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate, data } from "react-router";
import supabase from "../supaBaseConfig";
import {IoMdClose} from "react-icons/io";

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
      <form className="flex flex-col" action="">
        <span className="flex justify-between">
          <NavLink to={"/notesapp"} replace>
            <button className="text-white">
              <IoMdClose />
            </button>
          </NavLink>
          <NavLink to="/">
            <button className="text-white flex items-center" type="submit" onClick={handleSubmit}>
              save 
            </button>
          </NavLink>
        </span>
        <input
          placeholder="Title"
          value={title}
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
};
