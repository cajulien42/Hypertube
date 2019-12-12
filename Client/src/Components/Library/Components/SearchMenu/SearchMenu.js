import React, { useState } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import Interval from './Components/Interval/Interval';
import MultiSelectList from './Components/MultiSelectList/MultiSelectList';
import './SearchMenu.css';

const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Family',
  'Fantasy',
  'Romance',
  'Drama',
  'History',
  'Thriller',
  'Western',
  'Sci-Fi',
  'Mystery',
  'Crime',
  'War',
  'Biography',
  'Animation',
  'Sport',
  'Music',
  'Musical',
];

const array = genres.map((genre) => ({key: genre, text: genre, value: genre }));

export default (props) => {
  const [ options ] = useState(array);
  const [ years ] = useState({
    domain: [1900, 2019],
    defaultValues: [2010, 2019],
    label: 'Production Year',
  });
  const [ ratings ] = useState({
    domain: [0, 10],
    defaultValues: [5, 10],
    label: 'Rating',
  });
  const [ searchFilters ] = useState(props.searchFilters);

  const handleSearchBarChange = (query) => {
    const newFilters  = searchFilters;
    newFilters.query = query;
    props.onChange(newFilters); 
  }

  const handleSelectListChange = (selectedOptions) => {
    const newFilters  = searchFilters;
    newFilters.selectedOptions = selectedOptions;
    props.onChange(newFilters); 
  }

  const handleYearsChange = (yearInterval) => {
    const newFilters  = searchFilters;
    newFilters.yearInterval = yearInterval;
    props.onChange(newFilters); 
  }

  const handleRatingsChange = (ratingsInterval) => {
    const newFilters  = searchFilters;
    newFilters.ratingsInterval = ratingsInterval;
    props.onChange(newFilters); 
  }

  return (
    <div className='searchMenu'>
      <SearchBar onChange={handleSearchBarChange}/>
      <MultiSelectList options={options} onChange={handleSelectListChange}/>
      <React.Fragment>
      <Interval domain={years.domain}
                defaultValues={years.defaultValues}
                label={years.label}
                onChange={handleYearsChange}
      />
      <Interval domain={ratings.domain}
                defaultValues={ratings.defaultValues}
                label={ratings.label}
                onChange={handleRatingsChange}
      />
      </React.Fragment>
    </div>
  )
}
