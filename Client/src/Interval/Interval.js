import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import { SliderRail, Handle, Track } from './components' // example render components - source below
import './Interval.css';

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

// const defaultValues = [250, 350]

export default class Interval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: props.domain,
      label: props.label,
      values: props.defaultValues.slice(),
      update: props.defaultValues.slice(),
      reversed: false,
    }
  }
  

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
    this.props.onChange({ values })
  }

  setDomain = domain => {
    this.setState({ domain })
  }

  toggleReverse = () => {
    this.setState(prev => ({ reversed: !prev.reversed }))
  }

  render() {
    const {
      state: { domain, values, update, reversed, label },
    } = this

    return (
      <div className='interval'>
        <div className='range'>
          <span>{label} : </span>
          <span>{update[0]} - {update[1]} </span>
        </div>
        <Slider
          mode={2}
          step={1}
          domain={domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    )
  }
}

  