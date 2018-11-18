import React, { Component } from 'react';
import styled from 'styled-components';

const SIZE_MAP = {
  small:  20,
  medium: 40,
  large:  60,
};

const SwitchHolder = styled.div`
  border-radius: ${props => props.size / 2}px;
  height: ${props => props.size}px;
  width: ${props => 2 * props.size}px;
  background: ${props => props.isOn ? '#00cc00' : 'lightgrey'};
  z-index: 0;
  &:hover {
    cursor: pointer;
  }
`;

const SwitchCircle = styled.div`
  border-radius: ${props => props.size / 2}px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border: 1px solid lightgrey;
  margin-left: ${props => props.isOn ? props.size : 0}px;
  transition: margin-left 200ms linear;
  z-index: 1;
  background: white;
  box-sizing: border-box;
`;

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = { isOn: false };
  }

  handleClick = () => {
    this.setState(({ isOn }) => ({ isOn: !isOn }));
  }

  render() {
    const { size } = this.props;
    const { isOn } = this.state;

    return (
      <SwitchHolder
        size={SIZE_MAP[size]}
        isOn={isOn}
        onClick={this.handleClick}
        >
        <SwitchCircle
          size={SIZE_MAP[size]}
          isOn={isOn}
          />
      </SwitchHolder>
    );
  }
}

export default Switch;
