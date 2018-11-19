import React, { Component } from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: ${({ downBeat, size }) => downBeat ? size : 1.1 * size}px;
  height: ${({ downBeat, size }) => downBeat ? size : 1.1 * size}px;
  border-radius: 50%;
  transition: ${({ beatPeriod }) =>
    `width ${beatPeriod / 2}s, height ${beatPeriod / 2}s, font-size ${beatPeriod / 2}s, line-height ${beatPeriod / 2}s, background ${beatPeriod}s`
  };
  background: ${({ fadeOut }) => fadeOut ? 'white' : 'orange'};
  color: white;
  font-size: ${({ downBeat, size}) => downBeat ? 0.5 * size : 0.5 * size}px;
  text-align: center;
  vertical-align: middle;
  line-height: ${({ downBeat, size }) => downBeat ? size : 1.1 * size}px;
`;

class Timer extends Component {
  constructor(props) {
    super(props);

    const {
      size = 100, // px
      time = 10, // s
      beatPeriod = 1, // s
    } = props;

    this.state = {
      time,
      isSmall: true,
      fadeOut: false,
    };

    this.size = size;
    this.beatPeriod = beatPeriod;
  }

  componentDidMount() {
    const { onComplete = () => { console.log('complete'); } } = this.props;

    this.beatIntervalId = setInterval(() => {
      this.setState(state => ({ downBeat: !state.downBeat }));
    }, this.beatPeriod * 1000 / 2);

    this.timeIntervalId = setInterval(() => {
      if (this.state.time === 1) {
        onComplete();
        this._clearIntervals();
        return;
      }

      this.setState(state => ({
        time: state.time - 1,
        fadeOut: state.time === 2,
      }));
    }, this.beatPeriod * 1000);
  }

  componentWillUnmount() {
    this._clearIntervals();
  }

  _clearIntervals = () => {
    clearInterval(this.beatIntervalId);
    clearInterval(this.timeIntervalId);
  }

  render() {
    const { downBeat, time, fadeOut } = this.state;
    if (time < 0) {
      return null;
    }

    return (
      <Circle
        downBeat={downBeat}
        size={this.size}
        beatPeriod={this.beatPeriod}
        fadeOut={fadeOut}
        >
        {time}
      </Circle>
    )
  }
}

export default Timer;
