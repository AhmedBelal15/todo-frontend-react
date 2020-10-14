import React, {useState} from "react";
import { ReactComponent as Trash } from "../../Assets/trash-icon.svg";
import {ReactComponent as Edit} from '../../Assets/edit-icon.svg'
import {useAlert} from 'react-alert'
import EditPopup from '../EditPopup/EditPopup.component'
import './Card.styles.css'

const Card = ({ title, description, handleDelete, _id, todo, setTodo }) => {
  const alert = useAlert()
  const [action, setAction] = useState("");
  const [popup, setPopup] = useState(false)
  const alertOptions = () => {
   return alert.show("Are you sure u want to delete this task?", {
      title: "Warning!",
      closeCopy: "Cancel",
      actions: [
        {
          copy: "Delete",
          onClick: () => setAction(handleDelete),
        },
        
      ],
    });
  }
 

  return (
    <div className="flex max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="flex justify-end text-red-600 pl-auto">
        <Trash className="self-center fill-current svg cursor-pointer" onClick={alertOptions} />
        <Edit className="self-center text-blue-500 fill-current svg2 cursor-pointer" onClick={()=> setPopup(!popup)} />
        {popup? <EditPopup setPopup={setPopup} _id={_id} todo={todo} setTodo={setTodo} /> : null }
      </div>
    </div>
  );
};

export default Card;