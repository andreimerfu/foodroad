
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';
import { ResErrors } from '../shared/form/ResErrors';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, errors} = props
  return (
   <div >
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
      <button className='btn btn-success' type="submit" disabled={ pristine || submitting }>
        Submit
      </button>
    </form>
    </div>
  )
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)
