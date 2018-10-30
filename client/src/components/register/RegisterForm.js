import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb} = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label='Email'
        className='form-control'
        component={AuthInput}
      />
      <Field
        name="password"
        type="password"
        label='Password'
        className='form-control'
        component={AuthInput}
      />
      <Field
        name="password-confirmation"
        type="password"
        label='Password Confirmation'
        className='form-control'
        component={AuthInput}
      />
      <button className='btn btn-success' type="submit" disabled={pristine || submitting}>
        Register
      </button>
    </form>
  )
}


export default reduxForm({
  form: 'registerForm',
})(RegisterForm)
