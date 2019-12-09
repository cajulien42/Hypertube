import React, { Component } from 'react';
import axios from 'axios';
import Movie from '../Movie/Movie'
import { shallowEqual } from 'fast-equals';
import SearchMenu from '../SearchMenu/SearchMenu';
import _ from 'lodash';

class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies:[],
      cards:[],
      searchFilters: null,
    }
  }

  updateMovies = () => {
    if (this.state.searchFilters) {
      console.log(this.state.searchFilters);
      const { query, ratingsInterval, selectedOption, yearInterval } = this.state.searchFilters;
      const req = [
        { query: query.length > 3 ? query : null },
        { yMin: yearInterval[0] },
        { yMax: yearInterval[1] },
        { rMin: ratingsInterval[0] },
        { rMax: ratingsInterval[1] },
        { genre: selectedOption ? selectedOption : null },
      ];
      console.log(req);
      const terms = req.map((queryTerm) => {
        const entry =  Object.entries(queryTerm)
        console.log(entry);
        if (entry[0][1] !== undefined && entry[0][1] !== null  ) return `${entry[0][0]}=${entry[0][1]}`
        return null;
      })
      const tmp = _.without(terms, null)
      console.log(tmp);

      let string = 'http://localhost:4000/MovieLibrary/search/?';
      tmp.forEach((term, i) => {
        console.log(term);
       if (term && i === 0) { string = string.concat(`${term}`) }
       else if (term) { string = string.concat(`&${term}`) } 
      })
      console.log(string);
      axios.get(string, null)
        .then((data) => {
          if(data.data.success === true) {
            this.setState({
              movies: data.data.payload,
            }, () => console.log(this.state.movies) );
          }
        })
        .catch(err => console.log(err))
    }
  }

  handleChange = searchFilters => {
    this.setState(
      { searchFilters }, () => this.updateMovies()
    );

  };
  
  componentDidMount = () => {
    axios.get('http://localhost:4000/MovieLibrary', null)
      .then((data) => {
        if(data.data.success === true) {
          this.setState({
            movies: data.data.payload
          }, () => console.log(this.state.movies) );
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <SearchMenu onChange={this.handleChange}/>
        <React.Fragment>
        {this.state.movies.length ? 
        this.state.movies.map(movie => (
          <Movie key={movie.movie.id} movie={movie.movie}/>
        )) : null }
        </React.Fragment>
      </div>
    );
  }
  
}

export default Library;
