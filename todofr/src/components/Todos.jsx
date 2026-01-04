// import React from "react";
import { MdAccessAlarm } from "react-icons/md";
import { ImRadioUnchecked } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import supabase from "../supaBaseConfig";
import React from "react";

function Todos({
  clientSideDelete,
  item,
  setTodoList,
  todoList,
  isCompleted,
  setShowTaskCompleted,
  setShowTaskRemoved,
  setShowDropDown,
  setCompletedList,
  completedList,
  handleClick,
}) {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", item.id)
      .select();
    console.log(data);

    if (error) {
      console.log(error);
    }
    if (data) {
      clientSideDelete(item.id);
    }
  };
  const handleMoreOptions = () => {
    // item.showDropDown = !item.showDropDown;
    // we're filter out this item from the todo list and replacingit with a version of it that the new boolean state
    setTodoList([
      ...todoList.filter((todo) => todo.id !== item.id),
      { ...item, showDropDown: !item.showDropDown },
    ]);
  };
  // console.log(todoList);
  
  return (
    <>
      <li
        onClick={() => {}}
        className="bg-white bg-opacity-5 h-fit py-5 px-2 w-[90%] rounded-lg flex gap-5"
      >
        <span className="flex">
          {/* <input onClick={handleSetCompletedList} type="checkbox" name="" id="" /> */}
          <button className="text-white" onClick={() => handleClick(item)}>
            {todoList ? <ImRadioUnchecked /> : <FaCheckCircle />}
            {/* this todoList might bug later idk */}
          </button>
        </span>
        <div className="w-full">
          <span className="text-white">{item.data}</span>
          <span className="flex justify-between">
            {/* <span>{item.created_at.toLocaleString()}</span> */}
            <span>
              {item.due_date ? (
                <span className="flex justify-between w-full">
                  <span className="pt-1 text-red-800">
                    <MdAccessAlarm />
                  </span>
                  <span className=" align-text-top text-red-800">
                    {new Date(item.due_date).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </span>
              ) : (
                ""
              )}
            </span>
          </span>
        </div>
        <button onClick={handleDelete} className="flex text-white items-center">
          <IoMdTrash />
        </button>
        {item.showDropDown && (
          <ul className="absolute right-0 text-white bg-slate-600">
            <li>
              <button>Delete</button>
            </li>
            <li>Edit</li>
            <li>Share</li>
          </ul>
        )}
      </li>
    </>
  );
}

export default Todos;
