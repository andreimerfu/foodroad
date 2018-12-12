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
        label='Email address'
        className='form-control border-0 shadow'
        component={AuthInput}
      />
      <Field
        name="password"
        type="password"
        label='Password'
        className='form-control border-0 shadow text-violet'
        component={AuthInput}
      />
      <Field
        name="password-confirmation"
        type="password"
        label='Password Confirmation'
        className='form-control border-0 shadow text-violet'
        component={AuthInput}
      />
      <div>
      <button className='btn btn-primary shadow px-5 my-4' type="submit" disabled={pristine || submitting}>
        Sign up
      </button>
      </div>
    </form>
    </div>
  )
}

export default reduxForm({
  form: 'registerForm',
})(RegisterForm)
