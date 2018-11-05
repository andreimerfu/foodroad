import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';
import { ResErrors } from '../shared/form/ResErrors';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, errors} = props
  return (
    <div>
    <ResErrors errors={errors} />
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
      <div className='form-row'>
      <button className='btn btn-success submit-btn' type="submit" disabled={pristine || submitting}>
        Register
      </button>
      </div>
    </form>
    </div>
  )
}

export default reduxForm({
  form: 'registerForm',
})(RegisterForm)
