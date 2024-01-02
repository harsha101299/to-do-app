import React, { useState } from "react";
import classes from "../styles/Item.module.css";
import DeleteLay from "./DeleteLay";
import EditForm from "./EditForm";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

const ListItem = ({ title, date, id }) => {
  const [DelForm, setDelForm] = useState(false);
  const [EditFormS, setEditFormS] = useState(false)

  let diffDate = date - new Date();
  let colorCheck = classes.color3;

  if (diffDate <= 86400000) {
    colorCheck = classes.color1;
  } else if (diffDate <= 86400000 * 2) {
    colorCheck = classes.color2;
  } else if (diffDate <= 86400000) {
    colorCheck = classes.color3;
  }

  const OnClickDel = () => {
    setDelForm(true);
  };
  
  const OnClickDelCancel = () => {
    setDelForm(false);
  };

  const OnClickEdit = () =>{
    setEditFormS(true)
  }
  const OnClickEditCancel = () =>{
    setEditFormS(false)
  }

  return (

    <div className={classes.item}>
      <span className={`${classes.priority} ${colorCheck}`}> </span>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.whenTo}>
        <span className={classes.dateHead} >Finish by: </span>
        <span className={classes.dateBody} >{date?.toDateString()}</span>
      </div>
      <div className={classes.deleteIcon} id={id} onClick={OnClickDel}>
        <MdDelete size={"28px"} color="red" />
      </div>
      <div className={classes.editIcon} id={id} onClick={OnClickEdit}>
        <MdModeEditOutline size={"28px"} color="gray" />
      </div>
      {DelForm && <DeleteLay id={id} OnClickDelCancel={OnClickDelCancel} />}
      { EditFormS && <EditForm id={id} OnClickEditCancel={OnClickEditCancel} />}
      
    </div>


  );
};

export default ListItem;
