import React, { useState } from "react";

function Input({ formData, setFormData, todoList, isCompleted, setShowModal }) {
  const [date, setDate] = useState("");
  // const [showModal, setShowModal] = useState(true);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    todoList[todoList.length] = {
      id: todoList.length + 1,
      data: formData,
      isCompleted: isCompleted,
      created_at: new Date(),
      due_date: date ? new Date(date) : "",
      showDropDown: false,
    };
    setFormData("");
    setDate("");
    // setTimeout(()=>{
    //   alert(this.data)
    // }, this.due_date.getTime())
  };
  const handleDate = (e) => {
    setDate(e.target.value);
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
              value={formData}
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
