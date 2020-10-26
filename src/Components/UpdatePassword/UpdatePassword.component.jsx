import React, { useState } from "react";
import { useForm } from "../../CustomHooks/useForm";
import { useParams } from "react-router-dom"
import {useAlert} from 'react-alert'

const UpdatePassword = () => {
const {resetToken} = useParams()
const alert = useAlert()
const [ , setAction] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(values.password !== values.confirmPassword) { return alert.show('Passwords are not identical!') }
    const response = await fetch(`http://localhost:4000/api/user/updatepassword/${resetToken}`, 
    {
        method: 'put',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: values.password,
            confirmPassword: values.confirmPassword
        })
    })
    const data = await response.json()
    alert.show(data, {
        actions: [
          {
            copy: "Sign In",
            onClick: () => setAction(window.location.href = "http://localhost:3000/sign-in"),
          },
        ],
      })
  };
 
  const [values, handleChange] = useForm({
    password: "",
    confirmPassword: "",
  });

  return (
    <form className="w-auto max-w-sm pt-16 pb-4 container mx-auto" onSubmit={handleSubmit}>
      <div className="md:flex md:items-center mb-6 justify-center">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Enter Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={handleChange}
            required
            minLength='6'
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-password"
          >
            Confirm Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            required
            minLength='6'
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
