import React from "react";
// import {  useState, useRef, useCallback } from "react";
// import useFetch from "../../CustomHooks/useFetch";
import Card from "../Card/Card.component";

const GetTodos = ({ todos, lastTodo, loading, setTodos }) => {
  //Get token from localstorage
  const token = JSON.parse(localStorage.getItem("currentUser")).accessToken;
  const refreshToken = JSON.parse(localStorage.getItem("currentUser"))
    .refreshToken;

  // handleDelete
  const handleDelete = async (id) => {
    const response = await fetch(
      `https://aqueous-earth-51842.herokuapp.com/user/removetodo/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          auth: `Bearer ${token}`,
          refreshToken,
        },
      }
    );
    const stat = response.status;
    if (stat === 202) {
      setTodos(
        todos.filter((item) => {
          return item._id !== id;
        })
      );
    }
  };

  //handle Checkbox
  const handleCheckbox = async (id, index) => {
    const response = await fetch(
      `https://aqueous-earth-51842.herokuapp.com/user/marktodo/${id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          auth: `Bearer ${token}`,
        },
      }
    );
    const stat = response.status;
    if (stat === 200) {
      const newTodos = [...todos];
      newTodos[index].completed = !newTodos[index].completed;
      setTodos(newTodos);
    }
  };

  //Returning the Card Component and passing necessary data
  return (
    <div>
      {todos.map((item, i) => {
        if (todos.length === i + 1) {
          return (
            <div key={todos[i]._id} ref={lastTodo}>
              <Card
                title={todos[i].title}
                description={todos[i].description}
                toBeDoneAt={todos[i].toBeDoneAt}
                _id={todos[i]._id}
                completed={todos[i].completed}
                className="mt-2"
                handleDelete={() => handleDelete(todos[i]._id)}
                handleCheckbox={() => handleCheckbox(todos[i]._id, i)}
                todos={todos}
                setTodos={setTodos}
              />
            </div>
          );
        }
        return (
          <div key={todos[i]._id}>
            <Card
              title={todos[i].title}
              description={todos[i].description}
              toBeDoneAt={todos[i].toBeDoneAt}
              _id={todos[i]._id}
              completed={todos[i].completed}
              className="mt-2"
              handleDelete={() => handleDelete(todos[i]._id)}
              handleCheckbox={() => handleCheckbox(todos[i]._id, i)}
              todos={todos}
              setTodos={setTodos}
            />
          </div>
        );
      })}
      {loading ? <div className="mt-5 loader mx-auto"></div> : null}
    </div>
  );
};

export default GetTodos;
