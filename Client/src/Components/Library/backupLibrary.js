import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Components/Movie/Movie'
import SearchMenu from './Components/SearchMenu/SearchMenu';
import _ from 'lodash';

class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      movies:[],
      searchFilters: {
        query: '',
        selectedOption: null,
        yearInterval: [2010, 2019],
        ratingsInterval: [5, 10],
      },
    }
  }

  updateMovies = () => {
    if (this.state.searchFilters) {
      console.log(this.state.searchFilters);
      const { query, ratingsInterval, selectedOption, yearInterval } = this.state.searchFilters;
      const req = [
        { query: query.length >= 3 ? query : null },
        { yMin: yearInterval[0] },
        { yMax: yearInterval[1] },
        { rMin: ratingsInterval[0] },
        { rMax: ratingsInterval[1] },
        { genres: selectedOption ? selectedOption : null },
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

      let string = `http://localhost:4000/MovieLibrary/search/page=${this.state.page}?`;
      tmp.forEach((term, i) => {
        console.log(term);
       if (term && i === 0) { string = string.concat(`${term}`) }
       else if (term) { string = string.concat(`&${term}`) } 
      })
      console.log(string);
      axios.get(string, null)
        .then((res) => {
          if(res.data.success === true) {
            this.setState({
              movies: res.data.payload,
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

  handleClick = movieID => {
    console.log(movieID);
    if (movieID) {
      axios.get(`http://localhost:4000/MovieLibrary/infos/${movieID}`)
        .then((res) => {
          console.log(res.data.payload);
        })
    }
  }
  
  componentDidMount = () => {
    const { query, ratingsInterval, selectedOption, yearInterval } = this.state.searchFilters;
    const req = [
      { query: query.length >= 3 ? query : null },
      { yMin: yearInterval[0] },
      { yMax: yearInterval[1] },
      { rMin: ratingsInterval[0] },
      { rMax: ratingsInterval[1] },
      { genres: selectedOption ? selectedOption : null },
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

    let string = `http://localhost:4000/MovieLibrary/search/page=${this.state.page}?`;
    tmp.forEach((term, i) => {
      console.log(term);
     if (term && i === 0) { string = string.concat(`${term}`) }
     else if (term) { string = string.concat(`&${term}`) } 
    })
    console.log(string);
    axios.get(string, null)
      .then((res) => {
        console.log(res.data.payload)
        if(res.data.success === true) {
          this.setState({
            movies: res.data.payload,
          }, () => console.log(this.state.movies) );
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        {movies && movies.docs ?
        <div>
          <div><p>search results:{movies.total}</p></div>
          <div><p>page {movies.page} of {movies.pages}</p></div>
        </div>
        : null }
        <SearchMenu onChange={this.handleChange}/>
        <React.Fragment>
        {movies && movies.docs && movies.docs.length ? 
        movies.docs.map(movie => (
          <Movie key={movie.id} movie={movie} handleClick={this.handleClick}/>
        )) : null }
        </React.Fragment>
      </div>
    );
  }
  
}

export default Library;
