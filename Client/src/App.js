import React from 'react';
import { Component } from 'react';
import Library from './Library/Library';
import SearchMenu from './SearchMenu/SearchMenu';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilters: [],
    }
  }

  handleChange = searchFilters => {
    this.setState(
      { searchFilters }
    );
  };

  render() {
    const { searchFilters } = this.state;
    return (
      <div className="App">
        <SearchMenu onChange={this.handleChange}/>
        <Library searchFilters={searchFilters}/>
      </div>
    );
  }
}

export default App;
