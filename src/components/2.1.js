import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 600px;
  height: 200px;
  border-radius: 3px;
  border: 2px solid light grey;
`;

const Input = styled.input`
  height: 20px;
  width: 20px;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  outline: none;
  border: none;
`;

const Cell = styled.li`
  display: inline-block;
  border: 2px solid lightgrey;
  &:not(:first-child) {
    border-left: 0;
  }
`;

const CellList = styled.ul`
  list-style-type: none;
`;

class CodeForm extends Component {
  constructor(props) {
    super(props);

    const { cellCount } = props;
    this.state = {
      isFocused: null,
      values: Array(cellCount).fill(''),
    };

    this.cellCount = cellCount;
    this.cellRefs = Array(cellCount).fill();
  }

  focusCells = () => {
    if (!this.state.isFocused) {
      this.cellRefs[0].focus();
      this.setState({ isFocused: true });
    }
  }

  handleKeyDown = idx => e => {
    const isComplete = (
      idx === this.cellCount - 1 &&
      !!this.state.values[this.cellCount - 1]
    );

    if (e.keyCode === 8) { // delete
      if (isComplete) {
        this.setState(state => {
          const values = state.values.slice();
          values[idx] = '';
          return { values };
        });
      } else if (idx > 0) {
        this.cellRefs[idx - 1].focus();
        this.setState(state => {
          const values = state.values.slice();
          values[idx - 1] = '';
          return { values };
        });
      }
    } else if (e.keyCode >= 48 && e.keyCode <= 57) { // 0-9
      const value = e.keyCode - 48;
      if (idx < this.cellCount - 1) {
        this.cellRefs[idx + 1].focus();
      }

      if (isComplete) {
        return;
      }

      this.setState(state => {
        const values = state.values.slice();
        values[idx] = value;
        return { values };
      });
    }
  }

  render() {
    return (
      <Container onClick={this.focusCells}>
        <CellList>
          {Array(this.cellCount).fill().map((_, idx) => {
            return (
              <Cell key={idx}>
                <Input
                  value={this.state.values[idx]}
                  ref={el => { this.cellRefs[idx] = el; }}
                  onKeyDown={this.handleKeyDown(idx)}
                  onMouseDown={e => { e.preventDefault(); }}
                  minLength='1'
                  maxLength='1'
                  />
              </Cell>
            );
          })}
        </CellList>
      </Container>
    )
  }
}

export default CodeForm;
