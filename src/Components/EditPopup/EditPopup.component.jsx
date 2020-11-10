import React, { useState } from "react";
import DatePickerComponent from "../Date Picker/DatePicker.Component";
import { useAlert } from "react-alert";

const EditPopup = ({
  setPopup,
  _id,
  todos,
  setTodos,
  title,
  description,
  toBeDoneAt,
}) => {
  const [values, handleChange] = useState({
    title,
    description,
    toBeDoneAt,
  });
  //Get token from localstorage
  const token = JSON.parse(localStorage.getItem("currentUser")).accessToken;
  const refreshToken = JSON.parse(localStorage.getItem("currentUser")).refreshToken;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    if (date > new Date(values.toBeDoneAt)) {
      return alert.show("Can't Accept Dates in the past");
    }
    if (
      values.title === title &&
      values.description === description &&
      values.toBeDoneAt === toBeDoneAt
    ) {
      return alert.show(
        "You must perform an edit to continue, or press Cancel"
      );
    }
    const response = await fetch(
      `https://aqueous-earth-51842.herokuapp.com/user/editTodo/${_id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          auth: `Bearer ${token}`,
          refreshToken
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          toBeDoneAt: values.toBeDoneAt,
        }),
      }
    );
  const stat = response.status
  if(stat === 200) {
    const newTodos = [...todos]
    newTodos.forEach(todo => {
      if(todo._id === _id){
        todo.title = values.title
        todo.description = values.description
        todo.toBeDoneAt = values.toBeDoneAt
      }
    })
    setTodos(newTodos)
  }  
      // setTodo({...todo, counter: todo.counter++});
      setPopup(false);
    
  };

  const alert = useAlert();
  const date1 = new Date(values.toBeDoneAt);
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Edit your Task!
                </h3>
                <div className="mt-2">
                  <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="flex items-center">
                      <input
                        name="title"
                        className="border-2 border-gray-600  appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Task title"
                        required
                        value={values.title}
                        onChange={(e) =>
                          handleChange({ ...values, title: e.target.value })
                        }
                      />

                      <DatePickerComponent
                        date={date1.toISOString().substring(0, 10)}
                        setDate={(e) =>
                          handleChange({
                            ...values,
                            toBeDoneAt: e.target.value,
                          })
                        }
                      />
                    </div>
                    <textarea
                      name="description"
                      className="text-gray-700 resize-none border rounded focus:outline-none focus:shadow-outline w-full py-2 my-2 z-50"
                      type="text"
                      placeholder=" Enter description to your task"
                      required
                      maxLength="150"
                      value={values.description}
                      onChange={(e) => {
                        handleChange({
                          ...values,
                          description: e.target.value,
                        });
                      }}
                    />

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button
                          type="submit"
                          className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Edit
                        </button>
                      </span>
                      <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          onClick={() => setPopup(false)}
                        >
                          Cancel
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;