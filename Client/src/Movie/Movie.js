import React from 'react';
import './Movie.css';



const Movie = (props) =>  {
  const { movie } = props;
  const src = `${movie.mediumCover}`;
  return (
    <div className='movie'>
      <h3>{movie.title}</h3>
      <div className='movieCard'>
        <div className='movieCover'>
          <img alt='movie' src={src}/>
        </div>
        <div className='movieInfos'>
          <span>Production year:{movie.year}</span>
        </div>
      </div>
      
      <span><strong>Synopsis:<br/></strong></span>
      <div className='synopsis'>
        <span>{movie.synopsis}</span>
      </div>
    </div>
  )
}

export default Movie;
