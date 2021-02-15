import React, { useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import TodoAdd from "../../Components/TodoAdd/TodoAdd.component";
import GetTodos from "../../Components/GetTodos/GetTodos.Component";
import ScrollBox from "../../Components/Scroll/ScrollBox.component";
import useFetch from "../../CustomHooks/useFetch";

const TodoPage = ({ currentUser }) => {
  const history = useHistory();
  if (!currentUser) {
    history.push("/");
  }

  const [pageNumber, setPageNumber] = useState(1);

  const { loading, todos, hasMore, setTodos } = useFetch(pageNumber);

  const observer = useRef();

  const lastTodo = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      if (observer.current !== undefined) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore === true) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
      console.log("hasMore", hasMore);
    },
    [hasMore, loading]
  );

  //_________________

  return (
    <div className="flex justify-center pb-2">
      <div>
        <div className="border-b border-blue-500 py-2 w-full">
          <TodoAdd setTodos={setTodos} />
        </div>

        <div className="mt-4">
          <ScrollBox>
            <GetTodos
              todos={todos}
              setTodos={setTodos}
              lastTodo={lastTodo}
              loading={loading}
            />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.currentUser,
  };
};

export default connect(mapStateToProps)(TodoPage);
