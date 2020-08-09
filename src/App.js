import React, { Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import SignInPage from './Pages/SignIn-Register Page/SignIn-Register'
import Header from  './Components/Header/Header.component'
import ScrollBox from './Components/Scroll/ScrollBox.component'

function App({currentUser}) {
  return (
    <Fragment>
      <Router>
       <Header />
       <ScrollBox>
       <Route path="/sign-in"  render={()=>
      currentUser ? (<Redirect to='/' />):
      (<SignInPage />)
    } />
       </ScrollBox>
      </Router>
    </Fragment>
  );
}

const mapStateToProps = ({user}) => {
  return {
    currentUser: user.currentUser
  }
}


export default connect(mapStateToProps,null)(App);
