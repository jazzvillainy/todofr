import React, { useEffect } from "react";
import Notes from "./notes";

function Completed({ todoList, setCompletedList, completedList, setTodoList, handleClick }) {
  return (
    <section className="flex flex-col">
      <ul className="flex flex-col gap-1 items-center">
        {completedList.map((x) => {
          return (
            <Notes
              setCompletedList={false}
              setTodoList={setTodoList}
              item={x}
              handleClick={handleClick}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default Completed;
