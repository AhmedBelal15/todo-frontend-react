import React from 'react'

 const DatePickerComponent = ({date, setDate}) => {

    return (
        <div className='justify-start'>
            <span className='py-2 pl-4'>To be done before</span>
            <input 
            name='toBeDoneAtDate'
            type = "date"
            value={date.toBeDoneAt} 
            onChange={setDate} 
            className = "pl-8"
            min ={Date.now()}
            required
            />
        </div>
        )
    }

export default DatePickerComponent