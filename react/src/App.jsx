import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import StudentList from './pages/StudentList';

const App = () => {
    console.log("App");
    return (
       <h1>Hello World</h1>
    );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
