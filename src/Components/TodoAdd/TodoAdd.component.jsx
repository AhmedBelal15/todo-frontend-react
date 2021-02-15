import React, { useState } from "react";
import DatePickerComponent from "../../Components/Date Picker/DatePicker.Component";
import { useAlert } from "react-alert";

const TodoAdd = ({ setTodos }) => {
  const alert = useAlert();

  // Get Token + userId
  const getUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = getUser.accessToken;
  const refreshToken = getUser.refreshToken;

  const [values, handleChange] = useState({
    title: "",
    description: "",
    toBeDoneAt: "",
  });

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    if (date > new Date(values.toBeDoneAt)) {
      return alert.show("Can't Accept Dates in the past");
    }
    const response = await fetch(
      "https://aqueous-earth-51842.herokuapp.com/todo/createtodo",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          auth: `Bearer ${token}`,
          refreshToken,
        },
        body: JSON.stringify({
          userId: getUser.userObject._id,
          title: values.title,
          description: values.description,
          toBeDoneAt: values.toBeDoneAt,
        }),
      }
    );

    const stat = response.status;
    const data = await response.json();
    if (stat === 200) {
      setTodos((prevTodos) => {
        return [data, ...prevTodos].flat(1);
      });
    }

    // reset the state
    handleChange({
      title: "",
      description: "",
      toBeDoneAt: "",
    });
  };

  //

  // Component
  return (
    <div className="pt-16 flex w-auto justify-center">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            name="title"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add Task title"
            required
            value={values.title}
            onChange={(e) => handleChange({ ...values, title: e.target.value })}
          />

          <DatePickerComponent
            date={values.toBeDoneAt}
            setDate={(e) =>
              handleChange({ ...values, toBeDoneAt: e.target.value })
            }
          />
        </div>
        <textarea
          name="description"
          className="resize-none border rounded focus:outline-none focus:shadow-outline w-full py-2 my-2 z-50"
          type="text"
          placeholder=" Enter description to your task"
          required
          maxLength="150"
          value={values.description}
          onChange={(e) => {
            handleChange({ ...values, description: e.target.value });
          }}
        />
        <button
          className="flex justify-center ml-32 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoAdd;
