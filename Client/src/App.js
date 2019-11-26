import React from 'react';
import { Component } from 'react';
import Library from './Library/Library';
import Search from './Search/Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <Library />
      </div>
    );
  }
}

export default App;
