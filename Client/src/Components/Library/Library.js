import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Components/Movie/Movie';
// import Show from './Components/Movie/Show';
// import Anime from './Components/Movie/Anime';
import SearchMenu from './Components/SearchMenu/SearchMenu';
import _ from 'lodash';

export default (props) => {
  const { type, paths }  = props;
  const path = paths[type];
  const [ page, setPage ] = useState(1);
  const [ movies, setMovies ] = useState([]);
  const [ searchFilters, setSearchFilters ] = useState({
    query: '',
    selectedOption: null,
    yearInterval: [2010, 2019],
    ratingsInterval: [5, 10],
  });

  const handleFiltersChange = newFilters => {
    setSearchFilters({...newFilters});
  }

  const handlePageChange = page => {
    setPage(page);
  }

  const handleClick = movieID => {
    if (movieID) {
      axios.get(`${path}/infos/${movieID}`)
        .then((res) => {
          console.log(res.data.payload);
        })
    }
  }

  useEffect(() => {
    const { query, ratingsInterval, selectedOption, yearInterval } = searchFilters;
    const req = [
      { query: query.length >= 3 ? query : null },
      { yMin: yearInterval[0] },
      { yMax: yearInterval[1] },
      { rMin: ratingsInterval[0] },
      { rMax: ratingsInterval[1] },
      { genres: selectedOption ? selectedOption : null },
    ];
    const terms = req.map((queryTerm) => {
      const entry =  Object.entries(queryTerm)
      if (entry[0][1] !== undefined && entry[0][1] !== null  ) return `${entry[0][0]}=${entry[0][1]}`
      return null;
    })
    const tmp = _.without(terms, null)
    let string = `${path}/search/page=${page}?`;
    tmp.forEach((term, i) => {
     if (term && i === 0) { string = string.concat(`${term}`) }
     else if (term) { string = string.concat(`&${term}`) } 
    })
    axios.get(string, null)
      .then((res) => { if (res.data.success === true) { setMovies(res.data.payload) } })
      .catch(err => console.log(err))
  },[searchFilters, page, path])

  return (
    <div>
      {movies && movies.docs ?
      <div>
        <div><p>Showing {movies.pagingCounter} - {movies.pagingCounter + movies.docs.length - 1} of {movies.totalDocs}</p></div>
        <div><p>{movies.prevPage} Previous page :{movies.prevPage} | Next page : {movies.nextPage}</p></div>
        <div><p>page {movies.page} of {movies.totalPages}</p></div>
      </div>
      : null }
      <SearchMenu onChange={handleFiltersChange} searchFilters={searchFilters}/>
        <React.Fragment>
        {movies && movies.docs && movies.docs.length ? 
        movies.docs.map(movie => {
          return <Movie key={movie.id} movie={movie} handleClick={handleClick}/>
        }) : null }
        </React.Fragment>
      {/* {type === 'show' ? 
        <React.Fragment>
        {shows && shows.docs && shows.docs.length ? 
        shows.docs.map(show => (
          <Show key={show.id} show={show} handleClick={handleClick}/>
        )) : null }
        </React.Fragment>
      : null }
      {type === 'anime' ? 
        <React.Fragment>
        {animes && animes.docs && animes.docs.length ? 
        animes.docs.map(anime => (
          <Anime key={anime.id} anime={anime} handleClick={handleClick}/>
        )) : null }
        </React.Fragment>
      : null } */}
    </div>
  );
}
