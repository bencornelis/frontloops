import React, { Component } from 'react';
import List from './components/2.2';

class App extends Component {
  render() {
    return (
      <div>
        <List
          items={[
            'Ice-cream',
            'Hot-dog',
            'Popcorn',
            'Cookie'
          ]}
        />
      </div>
    );
  }
}

export default App;
