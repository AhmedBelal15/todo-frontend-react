import React from 'react'
import {useForm} from '../../CustomHooks/useForm'
import DatePickerComponent from '../../Components/Date Picker/DatePicker.Component'

const TodoAdd = () => {
  
  // Get Token + userId
  const getUser =JSON.parse(localStorage.getItem('currentUser')) 
  // State
  const [values,handleChange] = useForm({
    userId: '',
    title: '', 
    description: '', 
    toBeDoneAt: ''
  })
  // Create state for the date picker 
  const [date,handleChange2] = useForm({
    toBeDoneAtDate: ''
  })



  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:4000/api/user/createtodo',
    {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: getUser.userObject._id,
        title: values.title,
        description: values.description,
        toBeDoneAt: date['toBeDoneAtDate']
      })
    })
    const data = await response.json()
    console.log(data)
  }



  // Component
    return (
      <div className='pt-16 flex w-auto justify-center'>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input 
            name="title"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
            type="text" 
            placeholder="Add Task title" 
            aria-label="Add task title " 
            required 
            value = {values.title}
            onChange = {handleChange}
            />
            <DatePickerComponent date={date.toBeDoneAtDate} setDate={handleChange2}  />
          </div>
          <textarea
          name="description" 
          className="resize-none border rounded focus:outline-none focus:shadow-outline w-full py-2 my-2 z-50" 
          maxLength='150' 
          placeholder=' Enter description to your task' 
          required 
          value = {values.description}
          onChange = {handleChange}
          />
          <button className="flex justify-center ml-32 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
              Add Task
            </button>
        </form>
      </div>
    )
}
  
export default TodoAdd