import React from 'react';
import SignIn from '../../Components/SignIn/SignIn.component'
import SignUp from '../../Components/SignUp/SignUp.component'
import './SignIn-Register.style.css'

const SignInPage = () => {
    return(
        <div className='mt-10 pt-10 flex justify-between sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInPage