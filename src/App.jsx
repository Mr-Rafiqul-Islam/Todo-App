import React, { useEffect } from "react";
import { useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update
} from "firebase/database";

function App() {
  const db = getDatabase();
  const [task, setTask] = useState("");
  const [err, setErr] = useState("");
  const [alltodos, setAlltodos] = useState([]);

  // Function to handle changes in the task input field
  let handleTask = (e) => {
    setTask(e.target.value);
    setErr("");
  };

  // Function to handle form submission
  let handleSubmit = (e) => {
    e.preventDefault();
    if (task !== "") {
      set(push(ref(db, "todo/")), {
        name: task,
        checked: false // Initialize checked state as false
      });
      setTask("");
      setErr("");
    } else {
      setErr("Please input task");
    }
  };

  useEffect(() => {
    const todoRef = ref(db, "todo/");
    onValue(todoRef, (snapshot) => {
      let myArray = [];
      snapshot.forEach((item) => {
        myArray.push({ ...item.val(), id: item.key });
      });
      setAlltodos(myArray);
    });
  }, []);

  // Function to handle checking/unchecking of todo items
  let handleCheck = (id, checked) => {
    update(ref(db, `todo/${id}`), { checked: !checked }); // Toggle the checked state
  };

  // Function to handle deletion of todo items
  let handleDelete = (id) => {
    remove(ref(db, `todo/${id}`));
  };

  // Function to reset all todo items
  let handleReset = () => {
    remove(ref(db, "todo/"));
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 !h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://e7.pngegg.com/pngimages/435/425/png-clipart-logo-circle-brand-font-circle-angle-text-thumbnail.png"
              alt="logo"
            />
            TODO APP
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white capitalize">
                add your all essential daily tasks
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Your Task
                  </label>
                  <input
                    type="text"
                    value={task}
                    onChange={handleTask}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="task..."
                    required=""
                  />
                  {err && <h1 className="text-red-500">{err}</h1>}
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do you want to delete your all task?
                  <a
                    onClick={handleReset}
                    className="ms-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Reset task
                  </a>
                </p>
              </form>
            </div>
          </div>
          {/* table data */}
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 !mt-4">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
                <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 rounded-lg">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      All Todos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alltodos.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-lg"
                    >
                      <th
                        scope="row"
                        className={`px-6 py-4 flex justify-between bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-lg ${
                          item.checked ? "bg-gray-200 dark:bg-gray-700" : "" // Change background color if item is checked
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name={item.name}
                            id={item.id}
                            className="me-1"
                            checked={item.checked}
                            onChange={() => handleCheck(item.id, item.checked)}
                          />
                          <label htmlFor={item.id}>{item.name}</label>
                        </div>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white py-1 px-2 rounded-md"
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
