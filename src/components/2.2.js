import React, { Component } from 'react';
import styled from 'styled-components';

const Text = styled.div`

`;

const Summary = ({ items }) => {
  const summarize = items => {
    let text;
    switch (items.length) {
      case 0:
        text = 'Please, select your items';
        break;
      case 1:
        text = items[0];
        break;
      case 2:
        text = `${items[0]}, ${items[1]}`;
        break;
      default:
        text = `${items[0]}, ${items[1]} and ${items.length - 2} more`;
    }
    return text;
  }
  return <Text>{summarize(items)}</Text>
}

const ItemList = styled.ul`
  list-style-type: none;
  padding: 20px;
`;

const Item = styled.li`
  background: ${props => props.isSelected ? 'lightgrey' : 'white'};
  border-radius: 2px;
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
  }
  ${props => props.bold && 'font-weight: bold;'}
`;

const ListWrapper = styled.div`
  width: 400px;
  height: 200px;
`;

class List extends Component {
  constructor(props) {
    super(props);

    const items = props.items.map(label => ({ label, isSelected: false }));
    this.state = {
      items,
      allSelected: false
    };
  }

  toggleItemSelected = idx => {
    this.setState(({ items }) => {
      items = items.slice();
      items[idx].isSelected = !items[idx].isSelected;

      const allSelected = items.every(item => item.isSelected);
      return {
        items,
        allSelected,
      };
    });
  }

  toggleAllSelected = () => {
    this.setState(({ items, allSelected }) => {
      items = items.map(item => ({ ...item, isSelected: !allSelected }));
      return {
        items,
        allSelected: !allSelected
      };
    })
  }

  render() {
    const { items, allSelected } = this.state;
    const selectedItemLabels = (
      items
        .filter(item => item.isSelected)
        .map(item => item.label)
    );

    return (
      <ListWrapper>
        <Summary items={selectedItemLabels} />
        <ItemList>
          <Item
            bold
            isSelected={allSelected}
            onClick={this.toggleAllSelected}
            >
            Check all
          </Item>
          {items.map(({ label, isSelected }, idx) =>
            <Item
              key={idx}
              isSelected={isSelected}
              onClick={() => this.toggleItemSelected(idx)}
              >
              {label}
            </Item>
          )}
        </ItemList>
      </ListWrapper>
    )
  }
}

export default List;
