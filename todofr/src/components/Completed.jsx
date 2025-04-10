import React, { useEffect } from "react";
// import Notes from "./notes";
import Todos from "./Todos";

function Completed({
  todoList,
  setCompletedList,
  completedList,
  setTodoList,
  handleClick,
}) {
  
  return (
    <section className="flex flex-col">
      <ul className="flex flex-col gap-1 items-center">
        {todoList

          .filter((x) => {
            return x.isCompleted == true;
          })
          .map((x) => {
            return (
              <Todos
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
