import React, { Component } from 'react';
import axios from 'axios';
import Movie from '../Movie/Movie'



class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies:[],
      cards:[],
    }
  }

  componentDidMount = async () => {
    const data = await axios
      .get('http://localhost:4000/movies')
      .catch(err => console.log(err))
      console.log(data.data.payload);
      this.setState({
        movies: data.data.payload
      }, console.log(this.state));
  }

  render() {
    return (
      <React.Fragment>
      {this.state.movies.map(movie => (
        <Movie key={movie.id} movie={movie}/>
      ))}
    </React.Fragment>
    )
  }
  
}

export default Library;
