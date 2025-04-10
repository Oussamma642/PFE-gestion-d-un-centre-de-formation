<<<<<<< HEAD

//  import './App.css'

function App() {

  

  return (
    <div className='App'>
      App
    </div>
  )
}

export default App
=======
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
>>>>>>> 2294c49121dd4a4604ef78ead28b284c7f61c536
