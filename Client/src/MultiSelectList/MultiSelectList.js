import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';



class MultiSelectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      selectedOptions: null,
    }
  }

  handleSelect =  (event, {value}) => {
    console.log(value);
    this.setState({
      selectedOptions: value
    }, () => this.props.onChange(value));
  }


  render() {
    const {options} = this.state;
    return (
      <Dropdown placeholder='Genres' fluid multiple selection options={options} onChange={this.handleSelect}/>
    )
  }
  
}

export default MultiSelectList;
