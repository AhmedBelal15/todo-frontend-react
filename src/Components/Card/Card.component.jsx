import React from 'react'
import {ReactComponent as Trash} from '../../Assets/trash-icon.svg'

const Card = ({title, description}) => {
return (
    <div className="flex flex-wrap max-w-sm rounded overflow-hidden shadow-lg">
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{title}</div>
    <p className="text-gray-700 text-base">
        {description}
    </p>
  </div>
  <div className="flex px-6 pt-4 pb-2 text-red-600">
  <Trash className='w-10 fill-current justify-end ' />
  </div>
</div>
)
}

export default Card