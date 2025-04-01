import React from "react";

function NoteCards({ item }) {
  return (
    <div className="bg-white bg-opacity-5 h-fit py-5 px-2 w-[90%] rounded-lg flex flex-col text-white">
      <span>{item.title}</span>
      <span>{item.content}</span>
      <span className="pt-1 text-stone-500">
        {item.created_at.toLocaleString()}
      </span>
    </div>
  );
}

export default NoteCards;
