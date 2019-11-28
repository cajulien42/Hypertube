import React, { Component } from 'react';
import axios from 'axios';
import Movie from '../Movie/Movie'
import { shallowEqual } from 'fast-equals';



class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies:[],
      cards:[],
      searchFilters: null,
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:4000/movies', null)
      .then((data) => {
        if(data.data.success === true) {
          this.setState({
            movies: data.data.payload
          });
        }
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate = () => {
    console.log(this.props.searchFilters);
    if (!shallowEqual(this.props.searchFilters, this.state.searchFilters)) {
      const body = this.props.searchFilters;
      axios.get('http://localhost:4000/movies', { body })
        .then((data) => {
          if(data.data.success === true) {
            this.setState({
              movies: data.data.payload,
              searchFilters: body,
            });
          }
        })
        .catch(err => console.log(err))

    }
    
    
  }

  render() {
    return (
      <React.Fragment>
      {this.state.movies.length ? 
      this.state.movies.map(movie => (
        <Movie key={movie.id} movie={movie}/>
      )) : null }
    </React.Fragment>
    )
  }
  
}

export default Library;
