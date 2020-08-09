import React from 'react';
import {useForm} from '../../CustomHooks/useForm'
import FormInput from '../Form Input/FormInput.component'
import CustomButton from '../CustomButton/CustomButton.component'
import {setCurrentUser} from '../../redux/user/user-actions'
import {connect} from 'react-redux'
import './SignIn.style.css'


const SignIn = ({setCurrentUser}) => {
    
    const handleSignIn = (e) => {
        e.preventDefault();
        setCurrentUser({
          currentUser: "Ahmed"
        })
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
                    <div className='buttons'>
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