import React from 'react';
import { Component } from 'react';
import Library from './Library/Library';
import SearchMenu from './SearchMenu/SearchMenu';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Library/>
      </div>
    );
  }
}

export default App;
