import React, { Component } from 'react';
import styled from 'styled-components';

const Square = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: fixed;
  left ${props => props.x}px;
  top: ${props => props.y}px;
  background: ${props => props.color};
  border-radius: 10%;
`;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

class DraggableSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 100,
      y: 100,
      isDragging: false,
      relMouseX: null,
      relMouseY: null,
      color: props.color,
    };
  }

  startDrag = (e) => {
    const { x, y } = this.state;
    const relMouseX = e.screenX - x;
    const relMouseY = e.screenY - y;

    this.setState({
      isDragging: true,
      relMouseX,
      relMouseY,
    });

    document.addEventListener('mousemove', this.updatePosition);
  }

  updatePosition = ({ screenX, screenY }) => {
    const { relMouseX, relMouseY } = this.state;
    const x = screenX - relMouseX;
    const y = screenY - relMouseY;
    this.setState({ x, y });
  }

  stopDrag = () => {
    this.setState({
      isDragging: false,
      relMouseX: null,
      relMouseY: null,
    });

    document.removeEventListener('mousemove', this.updatePosition);
  }

  render() {
    const { x, y, color } = this.state;

    return(
      <Square
        size={100}
        x={x}
        y={y}
        color={color}
        onMouseDown={this.startDrag}
        onMouseUp={this.stopDrag}
        />
    )
  }
}

const _id = (() => {
  let __id = 0;
  return () => {
    __id += 1;
    return __id;
  }
})();

class SquareApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: []
    };
  }

  handleClick = () => {
    const id = _id();
    const color = Math.random() < 0.5 ? 'red' : 'blue';
    const square = { id, color };

    this.setState(state => ({
      squares: [...state.squares, square]
    }));
  }

  render() {
    return (
      <Page>
        {this.state.squares.map(square => {
          const { id, color } = square;
          return <DraggableSquare key={id} color={color} />
        })}
        <button onClick={this.handleClick}>Generate Square</button>
      </Page>
    )
  }
}

export default SquareApp;
