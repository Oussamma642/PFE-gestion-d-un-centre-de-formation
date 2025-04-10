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
