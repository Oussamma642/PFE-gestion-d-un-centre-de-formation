<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ContexteProvider } from './contexts/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContexteProvider >
      <RouterProvider router={router} />
    </ContexteProvider>
  </StrictMode>,
)
=======
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
// import StudentList from './pages/StudentList';
console.log("Hello World");

const App = () => {
  // return <StudentList />;
  return <h1>Hello World</h1>;
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
>>>>>>> 2294c49121dd4a4604ef78ead28b284c7f61c536
