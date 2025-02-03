import React, { useState } from "react";
import NoteCards from "../components/NoteCards";
import Search from "../components/Search";
import { NavLink } from "react-router";

function NotesApp() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Grocery List",
      content: "Milk, Eggs, Bread, Butter, Apples",
      createdAt: "2023-10-01T08:30:00Z",
      tags: ["shopping", "urgent"],
    },
    {
      id: 2,
      title: "Meeting Notes",
      content:
        "Discussed project timelines and deliverables. Next meeting on Friday.",
      createdAt: "2023-10-02T14:15:00Z",
      tags: ["work", "meeting"],
    },
    {
      id: 3,
      title: "Book Recommendations",
      content: "1. Atomic Habits 2. The Alchemist 3. Sapiens",
      createdAt: "2023-10-03T10:00:00Z",
      tags: ["reading", "personal"],
    },
    {
      id: 4,
      title: "Fitness Plan",
      content:
        "Monday: Cardio, Tuesday: Weights, Wednesday: Yoga, Thursday: Rest",
      createdAt: "2023-10-04T07:45:00Z",
      tags: ["fitness", "health"],
    },
    {
      id: 5,
      title: "Travel Ideas",
      content: "1. Japan (Spring) 2. Italy (Summer) 3. Iceland (Winter)",
      createdAt: "2023-10-05T18:20:00Z",
      tags: ["travel", "planning"],
    },
  ]);
  // const [showInputModal, setShowInputModal] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 h-fit pb-20">
      <div className="w-full h-[15dvh]">
        <h1 className="text-white">Notes</h1>
      </div>

      <Search />
      {notes.map((item) => (
        <NavLink
          to={`/notesEditor/${item.id}`}
          className="w-full flex justify-center"
        >
          <NoteCards item={item} />
        </NavLink>
      ))}

      <div className="bg-transparent w-full h-1/5 fixed bottom-0 flex items-center justify-center">
        <NavLink
          to={`/notesEditor/${notes ? notes.length + 2 : notes.length + 1}`}
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
