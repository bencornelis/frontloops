import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid lightgrey;
  &:focus {
    border-bottom: 2px solid black;
  }
`;

const Label = styled.label`
`;

const Error = styled.div`
  color: red;
`;

const FormItemWrapper = styled.div``;

const FormItem = ({
  label,
  type,
  value,
  onChange,
  errorMessage,
  showError,
}) => {
  return (
    <FormItemWrapper>
      <Label>{label.toUpperCase()}</Label>
      <Input type={type} value={value} onChange={onChange}/>
      {showError && errorMessage && <Error>{errorMessage}</Error>}
    </FormItemWrapper>
  );
}

const Button = styled.button``;
const Form = styled.form``;

class CustomForm extends Component {
  constructor(props) {
    super(props);

    const fields = props.fields.map(field => {
      const {
        label,
        type = 'text',
        value = '',
        isRequired = false,
        validate = _ => true
      } = field;

      return {
        label,
        type,
        value,
        isRequired,
        validate,
        errorMessage: '',
      };
    })

    this.state = {
      fields,
      showErrors: false,
    };
  }

  handleFieldChange = idx => e => {
    const value = e.target.value;
    this.setState(({ fields }) => {
      fields = fields.slice();
      fields[idx] = {
        ...fields[idx],
        value,
      };

      return { fields };
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState(
      ({ fields }) => {
        fields = fields.map(field => {
          let errorMessage;
          const { label, value, isRequired, validate } = field;
          if (isRequired && value === '') {
            errorMessage = 'Field is required';
          } else if (!validate(value)) {
            errorMessage = `Enter a valid ${label}`;
          } else {
            errorMessage = '';
          }
          return {
            ...field,
            value,
            errorMessage,
          };
        });

        return { fields };
      },
      () => {
        const { fields } = this.state;
        const allCorrect = fields.every(({ errorMessage }) => errorMessage === '');
        if (allCorrect) {
          const entries = fields.map(({ label, value }) => ({ [label]: value }));
          this.props.onSubmit(entries);
        } else {
          this.setState({ showErrors: true });
        }
      }
    )
  }

  render() {
    const { fields, showErrors } = this.state;
    return (
      <Form>
        {fields.map(({ label, type, value, errorMessage }, idx) => (
          <FormItem
            key={idx}
            label={label}
            type={type}
            value={value}
            errorMessage={errorMessage}
            showError={showErrors}
            onChange={this.handleFieldChange(idx)}
          />
        ))}
        <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
      </Form>
    )
  }
}

export default CustomForm;
