import React, { useContext } from "react";
import classes from "../styles/delete.module.css";
import ToDoContext from "../context/todo-context";

const DeleteLay = ({OnClickDelCancel,id}) => {
  const ToDoCtx = useContext(ToDoContext)
  const makeCan =()=>{
    OnClickDelCancel()
  }

  const DeleteItem =(e)=>{
    ToDoCtx.DeleteItemsToDo(e.target.id)
  }
  return (
    <div className={classes.deleteLay}>
      <div className={classes.deleteModal}>
        <h1>Are You Sure?</h1>
        <span className={classes.buttons}>
          <button className={classes.buttonCan} onClick={makeCan} >Cancel</button>
          <button className={classes.buttonDel}  id={id} onClick={DeleteItem} >Delete</button>
        </span>
      </div>
      
    </div>
  );
};

export default DeleteLay;
