import React from 'react';
import logo from './logo.svg';
import './App.css';
import Departments from './Departments';
import Students from './Students';
import AddDepartment from './AddDepartment';
import AddStudent from './AddStudent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Demo API App</h1>
        <AddDepartment />
        <AddStudent />
        <Departments />
        <Students />
      </header>
    </div>
  );
}

export default App;
