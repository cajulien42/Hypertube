import React, { Component } from 'react'
import Select from 'react-select';
import './SelectList.css'



export default class SelectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      selectedOption: props.selectedOption,
    }
  }

   handleChange = selectedOption => {
    this.setState(
      { selectedOption }
    );
    this.props.onChange(selectedOption);
  };

  render() {
    const { selectedOption, options } = this.state;
    return (
      <div className='selectList'>
        <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        />
      </div>
    )
  }
}
