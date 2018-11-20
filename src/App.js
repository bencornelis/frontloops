import React, { Component } from 'react';
import CustomForm from './components/form';

class App extends Component {
  render() {
    return (
      <div>
        <CustomForm
          fields={[
            {
              label: 'name',
              type: 'text',
            },
            {
              label: 'email',
              type: 'text',
              isRequired: true,
              validate: email => email.includes('@')
            },
            {
              label: 'password',
              type: 'password',
              isRequired: true
            }
          ]}
          onSubmit={entries => { console.log(entries); }}
        />
      </div>
    );
  }
}

export default App;
