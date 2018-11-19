import React, { Component } from 'react';
import styled from 'styled-components';

const sumBefore = (arr, i) => {
  return arr.slice(0, i).reduce((sum, v) => sum + v, 0);
}

const sameValues = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

const Container = styled.div`
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

  ${props => props.bordered && `
    border: 2px solid ${props.borderColor};
    &:not(:first-child) {
      border-left: 0;
    }
  `}

  ${props => props.margin && `
    margin-left: 20px;
    margin-right: 20px;
  `}
`;

const Dash = styled.div`
  width: 20px;
  height: 0px;
  border: 1px solid lightgrey;
`;

const CellList = styled.ul`
  display: inline-block;
  list-style-type: none;
  padding: 0;
`;

class CodeForm extends Component {
  constructor(props) {
    super(props);

    const { code } = props;
    const codeGroups = (
      code.split('-')
          .map(group =>
            group
              .split('')
              .map(x => parseInt(x))
          )
    );
    const codeValues = codeGroups.reduce((acc, group) => acc.concat(group), []);

    const cellGroupCounts = codeGroups.map(group => group.length);
    const cellCount = cellGroupCounts.reduce((total, count) => total + count, 0);

    this.state = {
      isFocused: null,
      values: Array(cellCount).fill(''),
    };

    this.codeValues = codeValues;
    this.cellGroupCounts = cellGroupCounts;
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
      this.state.values[this.cellCount - 1] !== ''
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
    let borderColor;
    const { values } = this.state;
    const isComplete = values.every(value => value !== '');
    const isUnlocked = sameValues(values, this.codeValues);
    if (isComplete && isUnlocked) {
      borderColor = 'green';
    } else if (isComplete) {
      borderColor = 'red';
    } else {
      borderColor = 'lightgrey';
    }

    return (
      <Container onClick={this.focusCells}>
        {this.cellGroupCounts.map((cellGroupCount, i) => {
          const cellsBefore = sumBefore(this.cellGroupCounts, i);
          const isLastGroup = i === this.cellGroupCounts.length - 1;
          return (
            <CellList>
              {Array(cellGroupCount).fill().map((_, j) => {
                const idx = cellsBefore + j;
                return (
                  <Cell key={idx} bordered borderColor={borderColor}>
                    <Input
                      value={values[idx]}
                      ref={el => { this.cellRefs[idx] = el; }}
                      onKeyDown={this.handleKeyDown(idx)}
                      onMouseDown={e => { e.preventDefault(); }}
                      minLength='1'
                      maxLength='1'
                      />
                  </Cell>
                );
              })}
              {!isLastGroup && (
                <Cell margin>
                  <Dash />
                </Cell>
              )}
            </CellList>
          );
        })}
      </Container>
    )
  }
}

export default CodeForm;
