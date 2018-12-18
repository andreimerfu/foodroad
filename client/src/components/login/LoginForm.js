
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';
import { ResErrors } from '../shared/form/ResErrors';
import { required, minLength4 } from '../shared/form/validators';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function notify(errors) { 
  console.log(errors);
  toast.error(errors)
}


const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors} = props

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
        validate={[required]}
      />
      <Field
        name="password"
        type="password"
        label='Password'
        className='form-control border-0 shadow text-violet'
        component={AuthInput}
        validate={[required, minLength8]}
      />
      <div>
        <button className='btn btn-primary shadow px-5 my-4' onClick={notify(errors)} type="submit" disabled={!valid || pristine || submitting }>
          Log In
        </button>
        <ToastContainer />
      </div>
    </form>
    </div>
  )
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)