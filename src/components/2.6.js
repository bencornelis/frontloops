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
  font-size: ${({ downBeat, size}) => downBeat ? 0.5 * size : 0.55 * size}px;
  text-align: center;
  vertical-align: middle;
  line-height: ${({ downBeat, size }) => downBeat ? size : 1.1 * size}px;
`;

const TimerWrapper = styled.div`
  width: ${({ size }) => 1.1 * size}px;
  height: ${({ size }) => 1.1 * size}px;
  display:flex;
  justify-content: center;
  align-items: center;
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
      downBeat: true,
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
    if (time <= 0) {
      return null;
    }

    return (
      <TimerWrapper size={this.size}>
        <Circle
          downBeat={downBeat}
          size={this.size}
          beatPeriod={this.beatPeriod}
          fadeOut={fadeOut}
          >
          {time}
        </Circle>
      </TimerWrapper>
    );
  }
}

const Form = styled.form`
`;
const Input = styled.input`
`;
const Button = styled.button`
`;

class TimerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(parseInt(this.state.value));
    this.setState({ value: '' });
  }

  render() {
    return (
      <Form>
        <Input onChange={this.handleChange} value={this.state.value} />
        <Button type='submit' onClick={this.handleSubmit}>Start boiling</Button>
      </Form>
    );
  }
}

const Container = styled.div`
  height: 200px;
  width: 600px;
  border: 1px solid grey;
`;

const _id = (() => {
  let __id = 0;
  return () => {
    __id += 1;
    return __id;
  }
})();

class TimerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: []
    };
  }

  addTimer = time => {
    this.setState(({ timers }) => {
      const id = _id();
      timers = [...timers, { id, time }];
      console.log(timers)
      return { timers };
    });
  }

  removeTimer = id => {
    this.setState(({ timers }) => {
      timers = timers.filter(timer => timer.id !== id);
      return { timers };
    });
  }

  render() {
    const { timers } = this.state;
    return (
      <Container>
        <TimerForm onSubmit={this.addTimer} />
        {timers.map(({ id, time }) =>
          <Timer
            key={id}
            time={time}
            size={50}
            onComplete={() => this.removeTimer(id)}
            />
        )}
      </Container>
    );
  }
}

export default TimerApp;
