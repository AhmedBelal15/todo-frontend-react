import React from 'react';
import {ReactComponent as Logo} from '../../Assets/checked-note.svg'
import {Link} from 'react-router-dom'
import './Header.Style.css';
import { connect } from 'react-redux';
import {setCurrentUser} from '../../redux/user/user-actions'

const Header = ({currentUser, setCurrentUser}) => {

    const handleSignout = () => {
        localStorage.clear()
        setCurrentUser({
            currentUser: null
          })
    }

return (
    <header className='flex items-center justify-between bg-blue-700 h-12 text-white fixed-nav'>
        <div className='ml-3'>
            <Link to='/todo'>
                <Logo className='w-10 fill-current' />
            </Link>
        </div>
        <div className='mr-3'>
            <ul >
                <Link to='/'>
                <li className='pl-2'>Home</li>
                </Link>
                <li className='pl-2'>About</li>
                {
                currentUser? 
                <li className='ml-2 cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full' onClick={handleSignout}>Sign Out</li>
                :
                <Link to='/sign-in'>
                <li className='ml-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full'>Sign In</li>
                </Link>
                }
                
            </ul>
        </div>
    </header>
)
}


const mapStateToProps = ({user}) => {
    return {
      currentUser: user.currentUser
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          setCurrentUser: ()=> {
              dispatch(setCurrentUser(null))
          }
      }
  }

export default connect (mapStateToProps,mapDispatchToProps) (Header);