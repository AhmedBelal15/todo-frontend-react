import React, {} from 'react';
import {useForm} from '../../CustomHooks/useForm'
import FormInput from '../Form Input/FormInput.component'
import CustomButton from '../CustomButton/CustomButton.component'
import './SignUp.Style.css'

const SignUp = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }


 const [values, handleChange] = useForm({
     name:'',
     email: '',
     password: '',
     confirmPassword: ''
 })
    
    return(
     <div className="sign-up">
        <h2 className='title'>I don't have an account</h2>
        <span className='font-cnd'>Sign Up with your email and password</span>
        
        <form onSubmit={handleSubmit} >
         <FormInput
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            label='Display Name'
            required
        />
        <FormInput
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          label='Email'
          required
         />
        <FormInput  
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            label='Password'
            required />

            <FormInput  
            type='password'
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
            label='confirmPassword'
            required />  
            
            <CustomButton type="submit">SIGN UP</CustomButton>                
        </form>
     </div> 
    )
}

export default SignUp;