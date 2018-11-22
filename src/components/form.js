import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid lightgrey;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 14px;
  &:focus {
    border-bottom: 2px solid black;
    outline: none;
  }
`;

const Label = styled.label`
  display: block;
  &:hover {
    cursor: pointer;
  }
`;

const Error = styled.div`
  color: red;
`;

const FormItemWrapper = styled.div`
  width: 100%;
`;

const FormItem = ({
  label,
  type,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <FormItemWrapper>
      <Label htmlFor={label}>{label.toUpperCase()}</Label>
      <Input id={label} type={type} value={value} onChange={onChange}/>
      {errorMessage && <Error>{errorMessage}</Error>}
    </FormItemWrapper>
  );
}

const Button = styled.button`
  height: 30px;
  width: 90px;
  border: none;
  border-radius: 1px;
  background: lightgrey;
  &:hover {
    cursor: pointer;
    background: grey;
  }
  &:focus {
    outline: none;
  }
`;

const Form = styled.form`
  width: 30vw;
  padding 30px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

class CustomForm extends Component {
  constructor(props) {
    super(props);

    const fields = props.fields.flatMap(_field => {
      const {
        label,
        type = 'text',
        value = '',
        required = false,
        confirmation = false,
        validate = _ => true,
      } = _field;

      const field = {
        label,
        type,
        value,
        required,
        validate,
        errorMessage: '',
        confirmation: false,
      }

      return (
        confirmation ?
          [ field, { ...field, confirmation: true, label: `Confirm ${label}` }]
          :
          [ field ]
      );
    })

    this.state = { fields };
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
        fields = fields.map((field, idx) => {
          const { label, value, required, validate, confirmation } = field;
          let errorMessage;
          if (required && value === '') {
            errorMessage = 'Field is required';
          } else if (!validate(value) && !confirmation) {
            errorMessage = `Enter a valid ${label}`;
          } else if (confirmation && value !== fields[idx-1].value) {
            errorMessage = 'Confirmation failed';
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
          const entries = (
            fields
              .filter(({ confirmation }) => !confirmation)
              .map(({ label, value }) => ({ [label]: value }))
          );
          this.props.onSubmit(entries);
        }
      }
    );
  }

  render() {
    const { fields } = this.state;
    return (
      <Form>
        {fields.map(({ label, type, value, errorMessage }, idx) => (
          <FormItem
            key={idx}
            label={label}
            type={type}
            value={value}
            errorMessage={errorMessage}
            onChange={this.handleFieldChange(idx)}
          />
        ))}
        <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
      </Form>
    )
  }
}

export default CustomForm;
