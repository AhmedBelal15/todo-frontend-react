import React from 'react';
import {useForm} from '../../CustomHooks/useForm'
import FormInput from '../Form Input/FormInput.component'
import CustomButton from '../CustomButton/CustomButton.component'
import {setCurrentUser} from '../../redux/user/user-actions'
import {connect} from 'react-redux'
import { useAlert } from "react-alert";
import {Link} from 'react-router-dom'
import './SignIn.style.css'


const SignIn = ({setCurrentUser}) => {
    const alert = useAlert()
    const handleSignIn = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/api/user/login',
        {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
           email: values.email,
           password: values.password
          })
        })

        const data = await response.json()
        
        if(data.msg === 'logged in') {
          setCurrentUser({
            currentUser: data.userObject
          })

          localStorage.setItem('currentUser', JSON.stringify(data))
        } else {
          alert.show(data);
        }
        }




 const [values, handleChange] = useForm({
     email: '',
     password: ''
 })
    

    return (
        <div className='sign-in pt-5'>
               <h2>I already have an account</h2>
               <span>Sign in with your email and password</span>

               <form onSubmit={handleSignIn}>
                   <FormInput 
                   name='email'
                   value={values.email}
                   required
                   type='email'
                   handleChange={handleChange}
                   label='email'
                   />

                   <FormInput 
                   name='password'
                   value={values.password}
                   required
                   type='password'
                   handleChange={handleChange}
                   label='password'
                   />
                  <Link to="/requestreset" className="hover:text-indigo-800"> Forgot password? </Link>
                    <div className='buttons mt-2 '>
                   <CustomButton type="submit"> Sign In </CustomButton>                   
                    </div>
               </form>
           </div>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
      setCurrentUser: (user)=>{
        dispatch(setCurrentUser(user))
      }
    }
  }
  

export default connect (null,mapDispatchToProps) (SignIn);