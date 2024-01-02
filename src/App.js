import { useContext, useState } from "react";
import "./App.css";
import ListItem from "./components/ListItem";
import AddToDo from "./components/AddToDo";
import ToDoContext from "./context/todo-context";
import { Toaster } from "react-hot-toast";

function App() {
  const ToDoCtx = useContext(ToDoContext);
  console.log('rend',ToDoCtx.RenderToDo)
  return (
    <div className="App">
      <header className="header">
        <span className="span1">To-do things</span>
        <span className="span2">...add your daily tasks</span>
      </header>
      <AddToDo />
      {ToDoCtx.RenderToDo.sort(function (a, b) {
        return a.date - b.date;
      }).map((item) => {
        return (
          <ListItem
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.date}
          />
        );
      })}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },

        }}
      />
    </div>
  );
}

export default App;
