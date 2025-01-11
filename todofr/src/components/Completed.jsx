import React, { useEffect } from "react";
import Notes from "./notes";

function Completed({ todoList }) {
    return (
    <section className="flex flex-col">
      <ul className="flex flex-col gap-1 items-center">
        {todoList
          .filter((item) => {
            return item.isCompleted == !false;
          })
          .map((x) => {
            return <Notes item={x} />;
          })}
      </ul>
    </section>
  );
}

export default Completed;
