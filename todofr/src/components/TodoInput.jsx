import { useContext, useState } from "react";
import supabase from "../supaBaseConfig";
import { AuthContext } from "../AuthContext";

function Input({
  textInputData,
  setTextInputData,
  todoList,
  isCompleted,
  setShowModal,
  setTodoList,
  setShowTaskAdded,
}) {
  const { session } = useContext(AuthContext);
  const [date, setDate] = useState("");
  const [submitError, setSubmitError] = useState(null);

  // handle textarea change
  const handleChange = (e) => setTextInputData(e.target.value);

  // handle datetime-local change
  const handleDate = (e) => setDate(e.target.value);

  // schedule a notification at the due date
  const setAlarm = (taskText) => {
    if (!date) return; // no date set
    const targetTime = new Date(date).getTime();
    const now = Date.now();
    const delay = targetTime - now;

    if (delay <= 0) return; // past date, don't schedule

    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification(taskText);
      }
    }, delay);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // request notification permission
    Notification.requestPermission();

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([
          {
            data: textInputData,
            isCompleted: isCompleted,
            due_date: date ? new Date(date).toISOString() : null,
            showDropDown: false,
            user_id: session.user.id,
          },
        ])
        .select();

      // handle Supabase errors
      if (error) {
        console.error("Supabase insert error:", error);
        setSubmitError(error.message || "Failed to add task");
        return; // stop execution if insert failed
      }

      // success: update UI
      setTodoList([...todoList, ...data]);
      setShowModal(false);
      setShowTaskAdded(true);
      setTextInputData("");
      setDate("");

      // schedule notification
      setAlarm(textInputData);
    } catch (err) {
      // catch unexpected errors like network failures
      console.error("Unexpected error:", err);
      setSubmitError("Unexpected error occurred. Try again.");
    }
  };

  return (
    <>
      <section
        onClick={() => setShowModal(false)}
        className="w-full h-full fixed backdrop-brightness-50 top-0 z-50"
      >
        <div onClick={(e) => e.stopPropagation()}>
          <form
            className="bg-stone-900 h-1/5 absolute bottom-0 w-full p-2 flex flex-col justify-between rounded-t-xl"
            onSubmit={handleSubmit}
          >
            <textarea
              className="rounded-lg bg-stone-700 appearance-none border-0 focus:outline-none text-white custom-scrollbar"
              placeholder="Add Item"
              value={textInputData}
              onChange={handleChange}
            />
            <span className="flex justify-between mt-2">
              <button
                className="bg-stone-700 w-1/5 rounded-lg p-1"
                type="submit"
              >
                Save
              </button>

              <input
                type="datetime-local"
                value={date}
                onChange={handleDate}
                className="bg-stone-700 w-1/5 rounded-lg p-2"
              />
            </span>

            {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

export default Input;
