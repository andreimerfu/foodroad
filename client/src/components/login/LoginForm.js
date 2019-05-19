
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';
import { ResErrors } from '../shared/form/ResErrors';
import { required, minLength8 } from '../shared/form/validators';


const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors} = props

  return (
   <div>
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label='Email'
        className='form-control border-0 shadow'
        component={AuthInput}
        validate={[required]}
      />
      <Field
        name="password"
        type="password"
        label='Parola'
        className='form-control border-0 shadow text-violet'
        component={AuthInput}
        validate={[required, minLength8]}
      />
      <div class="text-center">
        <button className='btn btn-primary shadow px-5 my-4 ' type="submit" disabled={!valid || pristine || submitting }>
           Intra in cont
        </button>
      </div>
    </form>
    </div>
  )
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)