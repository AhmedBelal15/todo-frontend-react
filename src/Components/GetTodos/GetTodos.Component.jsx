import React from "react";
import { useEffect, useState } from "react";
import Card from "../Card/Card.component";

const GetTodos = ({ todo, setTodo }) => {
  //Get token from localstorage
  const token = JSON.parse(localStorage.getItem("currentUser")).accessToken;
  //Initialize State
  const [todos, setTodos] = useState([]);
  //Fetching Todos data
  useEffect(() => {
    //Fetch using IIFE
    (async function () {
      const response = await fetch("http://localhost:4000/api/user/gettodos", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          auth: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTodos(data);
    })();
  }, [todo]);

  // handleDelete
  const handleDelete = async (id) => {
   await fetch(`http://localhost:4000/api/user/removeTodo/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json", auth: `Bearer ${token}` },
    });
    setTodo({todo: todo.counter++})
  };

  //Returning the Card Component and passing necessary data
  return todos.map((item, i) => {
    return (
      <Card
        title={todos[i].title}
        description={todos[i].description}
        toBeDoneAt={todos[i].toBeDoneAt}
        key={todos[i]._id}
        _id={todos[i]._id}
        className="mt-2"
        handleDelete={() => handleDelete(todos[i]._id)}
        todo={todo}
        setTodo={setTodo}
      />
    );
  });
};

export default GetTodos;
