import React from 'react';
import Library from './Components/Library/Library';
import './App.css';

const paths = {
  movie: 'http://localhost:4000/API/MovieLibrary',
  show: 'http://localhost:4000/API/ShowLibrary',
  anime: 'http://localhost:4000/API/AnimeLibrary',
}

export default () => {
  return (
    <div className="App">
      <Library paths={paths} type='show'/>
    </div>
  );
}

