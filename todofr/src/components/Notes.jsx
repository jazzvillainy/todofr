// import React from "react";
import { MdAccessAlarm } from "react-icons/md";
import { ImRadioUnchecked } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";

function Notes({
  item,
  setTodoList,
  todoList,
  // setIsCompleted,
  isCompleted,
  setShowTaskCompleted,
  setShowTaskRemoved,
  setShowDropDown,
  // showDropDown,
}) {
  const handleClickfr = () => {
    item.isCompleted = !item.isCompleted;
    if (!item.isCompleted) {
      setTimeout(() => {
        console.log(item.isCompleted);
        setShowTaskRemoved(true);
      }, 500);
      setTimeout(() => {
        setShowTaskRemoved(false);
      }, 4000);
    } else {
      // setIsCompleted(!isCompleted);

      todoList.filter;
      console.log(item);
      setTimeout(() => {
        console.log("boobs");
        setShowTaskCompleted(true);
      }, 500);
      setTimeout(() => {
        setShowTaskCompleted(false);
      }, 2500);
    }
  };
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
          {/* <input onClick={handleClickfr} type="checkbox" name="" id="" /> */}
          <button className="text-white" onClick={handleClickfr}>
            {!item.isCompleted ? <ImRadioUnchecked /> : <FaCheckCircle />}
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

export default Notes;
