import React, { Component } from 'react';
import styled from 'styled-components';

const FONT_SIZE = '20px';

const Container = styled.div`
  border-radius: 6px;
  width: 500px;
  height: 200px;
  border: 2px solid lightgrey;
  padding: 20px;
  font-size: ${FONT_SIZE};
`;

const Section = styled.div`
  height: 50%;
`;

const Input = styled.input`
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid lightgrey;
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${FONT_SIZE};
  margin-right: ${props => props.marginRight}
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  background: lightgrey;
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${FONT_SIZE};

  &:hover {
    cursor: pointer;
  }
`;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const value = parseInt(this.state.value);

    if (this.props.isValid(value)) {
      this.props.onSubmit(parseInt(this.state.value));
    } else {
      alert('Index not valid');
    }

    this.setState({ value: '' });
  }

  render() {
    return (
      <form>
        <Input
          type='number'
          value={this.state.value}
          onChange={this.handleChange}
          placeholder='Enter tab index'
          width='70%'
          marginRight='20px'
          />
        <Button
          type='submit'
          onClick={this.handleSubmit}
          width='25%'
          >
          Change tab
        </Button>
      </form>
    )
  }
}

const Tab = styled.li`
  display: inline-block;
  opacity: ${props => props.isCurrent ? 1 : 0.5};
  margin-right: 10px;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const TabList = styled.li`
  list-style-type: none;
`;

const TabContent = styled.div`
  padding-top: 20px;
`;

class TabManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTabIdx: 0
    };
  }

  setCurrentTabIdx = (tabIdx) => {
    this.setState({ currentTabIdx: tabIdx });
  }

  render() {
    const { tabs } = this.props;
    const { currentTabIdx } = this.state;
    const { content } = tabs[currentTabIdx];

    return (
      <Container>
        <Section>
          <Form
            isValid={(value) => value >= 1 && value <= tabs.length}
            onSubmit={(value) => { this.setCurrentTabIdx(value - 1); }}
          />
        </Section>
        <Section>
          <TabList>
            {tabs.map(({ name }, idx) =>
              <Tab
                isCurrent={idx === currentTabIdx}
                onClick={() => this.setCurrentTabIdx(idx)}
                >
                {name.toUpperCase()}
              </Tab>
            )}
          </TabList>
          <TabContent>{content}</TabContent>
        </Section>
      </Container>
    );
  }
}

export default TabManager;
