import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToDoContextProvider } from './context/todo-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToDoContextProvider>
    <App />
  </ToDoContextProvider>
);

