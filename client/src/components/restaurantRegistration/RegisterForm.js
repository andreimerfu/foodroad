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
        placeholder="hhhhs"
        className='form-control border-0 shadow'
        component={AuthInput}
      />
      <div class="row px-3">
        <div class="mr-2" style={{width: 328 + 'px'}}>
          <Field
            name="password"
            type="password"
            label='Password'
            className='form-control border-0 shadow text-violet'
            component={AuthInput}
          />
        </div>
          <div style={{ width: 328 + 'px' }}>
          <Field
            name="password-confirmation"
            type="password"
            label='Password Confirmation'
            className='form-control border-0 shadow text-violet'
            component={AuthInput}
          />
          </div>

      </div>
      <Field
        name="name"
        type="text"
        label='Restaurant Name'
        className='form-control border-0 shadow'
        component={AuthInput}
      />
      {/*<Field
        name="name"
        type="text"
        label='Address'
        className='form-control border-0 shadow'
        component={AuthInput}
      />*/}
       <Field
        name="manager_name"
        type="text"
        label='Manager name'
        className='form-control border-0 shadow'
        component={AuthInput}
      />
       <Field
        name="manager_phone"
        type="text"
        label='Phone'
        className='form-control border-0 shadow'
        component={AuthInput}
      />
      <Field
        name="cui"
        type="text"
        label='C.U.I'
        className='form-control border-0 shadow'
        component={AuthInput}
      />
      <div class="text-center">
        <button className='btn btn-primary shadow px-5 my-4' type="submit" disabled={pristine || submitting}>
          Inregistreaza
        </button>
      </div>
    </form>
    </div>
  )
}

export default reduxForm({
  form: 'registerForm',
})(RegisterForm)
