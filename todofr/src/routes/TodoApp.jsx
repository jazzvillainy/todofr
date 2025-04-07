import { useState, useEffect } from "react";
// import Notes from "./components/notes";
import Input from "../components/TodoInput";
// import Notes from "../components/notes";
import Completed from "../components/Completed";
import Todos from "../components/Todos";
import supabase from "../supaBaseConfig";
import { data } from "react-router";
// import { useEffect } from "react";
// import { data } from "react-router";

function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [textInputData, setTextInputData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTaskCompleted, setShowTaskCompleted] = useState(false);
  const [showTaskRemoved, setShowTaskRemoved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDropDown, setShowDropDown] = useState("");

  const [completedList, setCompletedList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("todos").select();
      if (error) {
        // setFetchErr("could not fetch the todo list items items");
        console.log(error);
        // setData("");
      }
      if (data) {
        console.log(data);

        setTodoList(data);
        // setFetchErr(null);
      }
      // if (!data) {
      //   setLoading(true);
      // }
    };
    fetchData();
    // localStorage.setItem("notes", data)
  }, []);
  const clientSideDelete = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };
  const handleSetCompletedList = (item) => {
    setCompletedList([...completedList, item]);
    setTodoList([...todoList.filter((x) => x !== item)]);

    // console.log(item);

    // item.isCompleted = !item.isCompleted;
    // if (!item.isCompleted) {
    //   setTimeout(() => {
    //     console.log(item.isCompleted);
    //     setShowTaskRemoved(true);
    //   }, 500);
    //   setTimeout(() => {
    //     setShowTaskRemoved(false);
    //   }, 4000);
    // } else {
    //   // setIsCompleted(!isCompleted);

    //   todoList.filter;
    //   console.log(item);
    //   setTimeout(() => {
    //     console.log("boobs");
    //     setShowTaskCompleted(true);
    //   }, 500);
    //   setTimeout(() => {
    //     setShowTaskCompleted(false);
    //   }, 2500);
    // }
  };
  const handleSetTodoList = (item) => {
    setTodoList([...todoList, item]);
    setCompletedList([...completedList.filter((x) => x !== item)]);
  };
  return (
    <>
      {/* {showTaskRemoved ? (
        <h1 className="absolute bottom-0">Task removed!</h1>
      ) : (
        ""
      )}
      {showTaskCompleted ? (
        <h1 className="absolute top-0">Task Completed!</h1>
      ) : (
        ""
      )} */}
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
                  <Todos
                    isCompleted={isCompleted}
                    setIsCompleted={setIsCompleted}
                    item={item}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    setShowTaskCompleted={setShowTaskCompleted}
                    setShowTaskRemoved={setShowTaskRemoved}
                    setShowDropDown={setShowDropDown}
                    showDropDown={showDropDown}
                    setCompletedList={setCompletedList}
                    completedList={completedList}
                    handleClick={handleSetCompletedList}
                    clientSideDelete={clientSideDelete}
                  />
                </li>
              );
            })}
        </ul>
      </section>
      <h4 className="px-5 py-1 text-gray-600">
        <b>COMPLETED</b>
      </h4>
      <Completed
        completedList={completedList}
        isCompleted={isCompleted}
        todoList={todoList}
        setCompletedList={setCompletedList}
        setTodoList={setTodoList}
        handleClick={handleSetTodoList}
      />

      {showModal && (
        <Input
          setShowModal={setShowModal}
          setTextInputData={setTextInputData}
          textInputData={textInputData}
          todoList={todoList}
          setTodoList={setTodoList}
          isCompleted={isCompleted}
        />
      )}
      <div className="bg-transparent w-full h-1/5 fixed bottom-0 flex items-center justify-center">
        <button
          className="bg-blue-800 rounded-full w-7 h-7 absolute bottom-20 sm:scale-150"
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
