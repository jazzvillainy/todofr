import { useState, useEffect } from "react";
// import Notes from "./components/notes";
import Input from "./components/Input";
import Notes from "./components/notes";
import Completed from "./components/Completed";

function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [formData, setFormData] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [showTaskCompleted, setShowTaskCompleted] = useState(false);
  const [showTaskRemoved, setShowTaskRemoved] = useState(false);
  // const [completedList, setCompletedList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDropDown, setShowDropDown] = useState("");

  return (
    <>
      {showTaskRemoved ? (
        <h1 className="absolute bottom-0">Task removed!</h1>
      ) : (
        ""
      )}
      {showTaskCompleted ? (
        <h1 className="absolute top-0">Task Completed!</h1>
      ) : (
        ""
      )}
      <h4 className="px-5 py-1 text-gray-600">
        <b>TO DO</b>
      </h4>
      <section className="flex flex-col">
        <ul className="flex flex-col-reverse gap-2">
          {todoList
            .filter((x) => {
              return x.isCompleted == false;
            })
            .map((item) => {
              console.log(item);
              //
              return (
                <li id={item.id} className="flex flex-col gap-1 items-center">
                  <Notes
                    isCompleted={isCompleted}
                    setIsCompleted={setIsCompleted}
                    item={item}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    setShowTaskCompleted={setShowTaskCompleted}
                    setShowTaskRemoved={setShowTaskRemoved}
                    setShowDropDown={setShowDropDown}
                    showDropDown={showDropDown}
                  />
                </li>
              );
            })}
        </ul>
      </section>
      <h4 className="px-5 py-1 text-gray-600">
        <b>COMPLETED</b>
      </h4>
      <Completed isCompleted={isCompleted} todoList={todoList} />

      {showModal && (
        <Input
          setShowModal={setShowModal}
          setFormData={setFormData}
          formData={formData}
          todoList={todoList}
          setTodoList={setTodoList}
          isCompleted={isCompleted}
        />
      )}
      <div className="bg-transparent w-full h-1/5 fixed bottom-0 flex items-center justify-center">
        <button
          className="bg-blue-800 rounded-full w-7 h-7 absolute bottom-10 sm:scale-150"
          type="submit"
          onClick={() => setShowModal(true)}
        >
          +
        </button>
      </div>
    </>
  );
}

export default TodoApp;
