import React from 'react';
import './ScrollBox.style.css';

const ScrollBox = ({children}) => {
return (
<div className='scroll-box'> 
    {children}
</div>
    )
}

export default ScrollBox;