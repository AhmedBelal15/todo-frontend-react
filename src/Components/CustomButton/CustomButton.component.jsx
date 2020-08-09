import React from 'react';
import './CustomButton.Style.css';

const CustomButton = ({children,isGoogleSignIn ,...otherProps}) =>{
    return(
        <button className={`custom-button`}  {...otherProps}>
            {children}
        </button>
    )
}

export default CustomButton;