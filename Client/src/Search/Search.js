import React, { Component } from 'react';
import { Searchbar } from 'react-native-paper';

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
    };
  }
  

  render() {
    const { query } = this.state;
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ query: query }); }}
        value={query}
      />
    );
  }
}


