// import React from "react";
import { MdAccessAlarm } from "react-icons/md";
import { ImRadioUnchecked } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";

function Todos({
  item,
  setTodoList,
  todoList,
  // setIsCompleted,
  isCompleted,
  setShowTaskCompleted,
  setShowTaskRemoved,
  setShowDropDown,
  // showDropDown,
  setCompletedList,
  completedList,
  handleClick,
}) {
  const handleMoreOptions = () => {
    item.showDropDown = !item.showDropDown;
    console.log(item);
  };
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
                    {item.due_date.toLocaleString()}
                  </span>
                </span>
              ) : (
                ""
              )}
            </span>
          </span>
        </div>
        <button
          onClick={handleMoreOptions}
          className="flex text-white items-center"
        >
          <IoMdMore />
        </button>
        {item.showDropDown && (
          <ul className="absolute right-0 text-white bg-slate-600">
            <li>Delete</li>
            <li>Edit</li>
            <li>Share</li>
          </ul>
        )}
      </li>
    </>
  );
}

export default Todos;
