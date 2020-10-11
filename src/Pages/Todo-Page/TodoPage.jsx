import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TodoAdd from "../../Components/TodoAdd/TodoAdd.component";
import GetTodos from "../../Components/GetTodos/GetTodos.Component";
import ScrollBox from "../../Components/Scroll/ScrollBox.component";
import { useState } from "react";

const TodoPage = ({ currentUser }) => {
  const [todo, todoUpdate] = useState({ counter: 0 });
  if (currentUser) {
    return (
      <div className="flex justify-center">
        <div>
          <div className="border-b border-blue-500 py-2 w-full">
            <TodoAdd todo={todo} todoUpdate={todoUpdate} />
          </div>

          <div className="mt-4">
            <ScrollBox>
              <GetTodos todo={todo} />
            </ScrollBox>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/sign-in" />;
  }
};

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.currentUser,
  };
};

export default connect(mapStateToProps)(TodoPage);
