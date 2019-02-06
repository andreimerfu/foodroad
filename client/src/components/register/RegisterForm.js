import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';
import { ResErrors } from '../shared/form/ResErrors';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, errors} = props;
  return (
    <div>
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label='Email'
        className='form-control border-0 shadow'
        component={AuthInput}
      />
      <Field
        name="password"
        type="password"
        label='Parola'
        className='form-control border-0 shadow text-violet'
        component={AuthInput}
      />
      <Field
        name="password-confirmation"
        type="password"
        label='Confirmare parola'
        className='form-control border-0 shadow text-violet'
        component={AuthInput}
      />
      <div>
      <div class="text-center">
         <button className='btn btn-primary shadow px-5 my-4' type="submit" disabled={pristine || submitting}>
            Inregistreaza-te
         </button>
      </div>
      </div>
    </form>
    </div>
  )
}

export default reduxForm({
  form: 'registerForm',
})(RegisterForm)
