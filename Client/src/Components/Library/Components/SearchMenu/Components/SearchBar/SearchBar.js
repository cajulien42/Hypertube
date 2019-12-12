import React, { Component } from 'react'
import './SearchBar.css'


export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
    this.props.onChange(this.search.value);
  }

  submitHandler(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className='searchBar'>
        <form onSubmit={this.submitHandler}>
          <input
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    )
  }
}
