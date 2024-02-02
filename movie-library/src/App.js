import './App.css';
import React from 'react';
import SearchForm from './components/SearchForm';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Library</h1>
        <SearchForm />
      </header>
    </div>
  );
}

export default App;
