import React from "react";
import { useEffect, useState } from "react";
import Card from "../Card/Card.component";

const GetTodos = ({ todo,setTodo }) => {
  //Get user from localstorage
  const userId = JSON.parse(localStorage.getItem("currentUser")).userObject._id;
  //Initialize State
  const [todos, setTodos] = useState([]);
  //Fetching Todos data
  useEffect(() => {
    //Fetch using IIFE
    (async function () {
      const response = await fetch("http://localhost:4000/api/user/gettodos", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setTodos(data);
    })();
  }, [todo]);

  // Todo Handlers
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/api/user/removeTodo/${id}`, {
      method: 'delete',

    })
    setTodo({counter: todo.counter++})
  };

  const handleEdit = () => {};
  //Returning the Card Component and passing necessary data
  return todos.map((item, i) => {
    return (
      <Card
        title={todos[i].title}
        description={todos[i].description}
        key={todos[i]._id}
        _id={todos[i]._id}
        className="mt-2"
        handleDelete = {()=>handleDelete(todos[i]._id)}
        todo={todo}
        setTodo={setTodo}
      />
    );
  });
};

export default GetTodos;
