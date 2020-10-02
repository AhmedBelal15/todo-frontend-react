import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import TodoAdd from '../Todo-Add-Page/TodoAdd.component'

const TodoPage = ({currentUser}) => {

  if(currentUser) {
    return (
      <div className='flex'>
        <div className='flex justify-center border-b border-blue-500 py-2 w-4/12 mx-12'>
        <TodoAdd />
        </div>
      </div>
    )
  } else {
    return <Redirect to="/sign-in" />
  }
}


const mapStateToProps = ({user}) => {
    return {
      currentUser: user.currentUser
    }
  }
  
  
export default connect(mapStateToProps, )(TodoPage)