
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';


const LoginForm = props => {
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

      <button className='btn btn-success' type="submit" disabled={ pristine || submitting }>
        Submit
      </button>
    </form>
  )
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)
