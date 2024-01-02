import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ToDoContext = createContext({
  RenderToDo: [],
  AddItemsToDo: () => {},
  DeleteItemsToDo: () => {},
  EditItemsToDo: () => {},
});

let Party = new Date();
// Change the date by adding 1 to it (today + 1 = tomorrow)
Party.setDate(Party.getDate() + 1);

let Call = new Date();
Call.setDate(Call.getDate() + 2);

const Data = [
  {
    id: 1,
    title: "Attend party!!",
    date: new Date(Party.toISOString().split("T")[0]),
  },
  {
    id: 2,
    title: "Order shoes in Amazon.",
    date: new Date(Call.toISOString().split("T")[0]),
  },
  {
    id: 3,
    title: "call john!",
    date: new Date(Call.toISOString().split("T")[0]),
  },
  { id: 4, title: "Meet Modi!", date: new Date("2024-12-17T11:52:13.641Z") },
];

const getIntialState = () => {
  const NewData = JSON.parse(localStorage.getItem("ToDoObjects"));
  
  for (let i = 0; i < NewData?.length; i++) {
    NewData[i].date = new Date(NewData[i].date);
    console.log( typeof NewData[i].date )
  }
  return NewData ? NewData : Data;
};
export const ToDoContextProvider = (props) => {
  const [RenderToDo, setRenderToDo] = useState(getIntialState);

  const AddItemsToDo = (NewItem) => {
    setRenderToDo([NewItem, ...RenderToDo]);
    toast.success("Added successfully!");
  };

  const EditItemsToDo = (NewItem) => {
    for (let i = 0; i < RenderToDo.length; i++) {
      if (RenderToDo[i].id == NewItem.id) {
        setRenderToDo((prevState) => {
          let NewState = prevState.filter((it) => it != RenderToDo[i]);
          NewState.push(NewItem);
          return NewState;
        });
      }
    }
    toast.success("Updated successfully!");
  };

  const DeleteItemsToDo = (DelId) => {
    for (let i = 0; i < RenderToDo.length; i++) {
      if (RenderToDo[i].id == DelId) {
        setRenderToDo((prevState) => {
          let NewState = prevState.filter((it) => it != RenderToDo[i]);
          return NewState;
        });
      }
    }
    toast.error("Deleted successfully!");
  };

  useEffect(() => {
    for (let i = 0; i < RenderToDo.length; i++) {
      // RenderToDo[i].date = new Date(RenderToDo[i].date);
    }
    localStorage.setItem("ToDoObjects", JSON.stringify(RenderToDo));
  }, [RenderToDo]);

  return (
    <ToDoContext.Provider
      value={{
        RenderToDo: RenderToDo,
        AddItemsToDo: AddItemsToDo,
        DeleteItemsToDo: DeleteItemsToDo,
        EditItemsToDo: EditItemsToDo,
      }}
    >
      {props.children}
    </ToDoContext.Provider>
  );
};
export default ToDoContext;
