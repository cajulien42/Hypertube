import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SelectList from '../SelectList/SelectList';
import Interval from '../Interval/Interval';
import './SearchMenu.css';


const options = [
  { value: 'action', label: 'action' },
  { value: 'comedy', label: 'comedy' },
  { value: 'fantasy', label: 'fantasy' },
  { value: 'romance', label: 'romance' },
  { value: 'horror', label: 'horror' },
];

export default class SearchMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: options,
      years: {
        domain: [1900, 2019],
        defaultValues: [2000, 2019],
        label: 'Production Year',
      },
      ratings: {
        domain: [0, 5],
        defaultValues: [0, 5],
        label: 'Rating',
      },
      searchFilters: {
        query: '',
        selectedOption: {},
        yearInterval: [2000, 2019],
        ratingsInterval: [0, 5],
      }
    }
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSelectListChange = this.handleSelectListChange.bind(this);
    this.handleYearsChange = this.handleYearsChange.bind(this);
    this.handleRatingsChange = this.handleRatingsChange.bind(this);
  }

  handleSearchBarChange(query) {
    const {searchFilters} = this.state
    searchFilters.query = query;
    this.setState(
      { searchFilters },
      this.props.onChange({ searchFilters})
    ); 
  }

  handleSelectListChange(selectedOption) {
    const {searchFilters} = this.state
    searchFilters.selectedOption = selectedOption;
    this.setState(
      { searchFilters },
      this.props.onChange({ searchFilters})
    );
  }

  handleYearsChange(yearInterval) {
    const {searchFilters} = this.state
    searchFilters.yearInterval = yearInterval;
    this.setState(
      { searchFilters },
      this.props.onChange({ searchFilters})
    );
  }

  handleRatingsChange(ratingsInterval) {
    const {searchFilters} = this.state
    searchFilters.ratingsInterval = ratingsInterval;
    this.setState(
      { searchFilters },
      this.props.onChange({ searchFilters})
    );
  }


  render() {
    const { genres, years, ratings } = this.state;
    return (
      <div className='searchMenu'>
        <SearchBar onChange={this.handleSearchBarChange}/>
        <SelectList onChange={this.handleSelectListChange}
                    options={genres}
        />
        <React.Fragment>
        <Interval domain={years.domain}
                  defaultValues={years.defaultValues}
                  label={years.label}
                  onChange={this.handleYearsChange}
        />
        <Interval domain={ratings.domain}
                  defaultValues={ratings.defaultValues}
                  label={ratings.label}
                  onChange={this.handleRatingsChange}
        />
        </React.Fragment>
      </div>
    )
  }
}