import React from 'react';
import {connect} from 'react-redux'
import './HomePage.Style.css'

const HomePage = ({currentUser}) => {
    if (currentUser) {
        return (
            <div className="pt-12 flex justify-center">
                <h1 className="text-center">
                Hi {currentUser.currentUser.name} , how are you? be sure to check your tasks <br/>
                Do not postpone today's work to tomorrow <br/>
                let's fight Procrastination together <br/>
                </h1>
                </div>
        )
    } else {
        return (
            <div className="pt-12 flex justify-center">
                <h1>make sure to sign in</h1>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => {
    return {
      currentUser: user.currentUser
    }
  }
  
export default connect(mapStateToProps) (HomePage);