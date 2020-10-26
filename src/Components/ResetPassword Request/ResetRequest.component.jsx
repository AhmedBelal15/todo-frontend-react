import React, {useState} from "react";
import { useForm } from "../../CustomHooks/useForm";
import { useAlert } from "react-alert";

const ResetRequest = () => {
  //Initialize State
  const [ , setAction] = useState("");
  const [values, handleChange] = useForm({
    email: "",
  });
  // useAlert
  const alert = useAlert();
  // handleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(values.email === "") {return}
    const response = await fetch(
      `http://localhost:4000/api/user/resetpassword`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
      }
    );
    const data = await response.json();
    alert.show(data, {
      actions: [
        {
          copy: "Go home",
          onClick: () => setAction(window.location.href = "http://localhost:3000"),
        },
      ],
    });
    
  };

  return (
    <div className="flex h-64 w-full pt-20 pl-16 items-center justify-center bg-gray-300">
      <form className=" max-w-sm bg-white p-4 rounded" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-blue-500 py-2">
          <input
            name="email"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email"
            placeholder="Enter your registered email"
            aria-label="email"
            value={values.email}
            onChange={handleChange}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetRequest;
