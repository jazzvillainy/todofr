import React, { useState } from "react";
import supabase from "../supaBaseConfig";

function Input({
  textInputData,
  setTextInputData,
  todoList,
  isCompleted,
  setShowModal,
  setTodoList,
}) {
  const [date, setDate] = useState("");
  // const [showModal, setShowModal] = useState(true);

  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleChange = (e) => {
    setTextInputData(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          id: todoList.length + 1,
          data: textInputData,
          isCompleted: isCompleted,
          // created_at: new Date(),
          due_date: date ? new Date(date) : "",
          showDropDown: false,
        },
      ])
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      // setTodoList(data)
    }
    // todoList[todoList.length] = {
    //   id: todoList.length + 1,
    //   data: textInputData,
    //   isCompleted: isCompleted,
    //   created_at: new Date(),
    //   due_date: date ? new Date(date) : "",
    //   showDropDown: false,

    // setTodoList([
    //   ...todoList,
    //   {
    //     id: todoList.length + 1,
    //     data: textInputData,
    //     isCompleted: isCompleted,
    //     created_at: new Date(),
    //     due_date: date ? new Date(date) : "",
    //     showDropDown: false,
    //   },
    // ]);

    setTextInputData("");
    setDate("");
    // setTimeout(()=>{
    //   alert(this.data)
    // }, this.due_date.getTime())
  };
  return (
    <>
      <section
        onClick={() => setShowModal(false)}
        className="w-full h-full fixed backdrop-brightness-50 top-0 z-50"
      >
        <div className="" onClick={(e) => e.stopPropagation()}>
          <form
            className="bg-stone-900 h-1/5 absolute bottom-0 w-[100%] p-2  flex flex-col justify-between rounded-t-xl"
            onSubmit={handleSubmit}
            action=""
          >
            {/* <label htmlFor=""></label> */}
            <textarea
              className="rounded-lg bg-stone-700 appearance-none border-0 focus:outline-none text-white custom-scrollbar "
              placeholder="Add Item"
              value={textInputData}
              onChange={handleChange}
              type="text"
            />
            <span className="flex justify-between">
              <button
                className="bg-stone-700 w-1/5 rounded-lg p-1"
                type="submit"
              >
                Save
              </button>

              <input
                type="datetime-local"
                onChange={handleDate}
                className="bg-stone-700 w-1/5 rounded-lg p-2"
              />
            </span>
          </form>
        </div>
      </section>
    </>
  );
}

export default Input;
