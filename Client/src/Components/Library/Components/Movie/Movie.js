import React from 'react';
import './Movie.css';

const Movie = (props) =>  {
  const { movie , handleClick } = props;
  console.log(movie)

  const { id } = movie;
  let src = '';
  if (movie.mediumCover) {
    src = `${movie.mediumCover}`;
  } else if (movie.images) {
    src = `${movie.images.poster}`;
  }
  if (src.includes('tvdb') || src === undefined || src === null) {
    src = 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif';
  }
  return (
    <div className='movie' onClick={() => handleClick(id)}>
      <h3>{movie.title}</h3>
      <div className='movieCard'>
        <div className='movieCover'>
          <img alt='movie' src={src}/>
        </div>
        <div className='movieInfos'>
          <p><span>Production year:{movie.year}</span></p>
          <p><span>rating:{movie.rating}</span></p>
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
