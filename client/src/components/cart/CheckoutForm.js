
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../shared/form/AuthInput';
import { ResErrors } from '../shared/form/ResErrors';

const CheckoutForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, errors} = props
  return (
   <div>
    <ResErrors errors={errors} />
    <form onSubmit={handleSubmit(submitCb)}>
      <div>
      <p>Delivery Address</p>
      <Field
        name="address"
        type="address"
        className='form-control border-0 shadow'
        component={AuthInput}
      />
      <p>Observations</p>
      <Field
        name="observations"
        type="observations"
        label="Observations"
        className="form-control"
        component="textarea"
      />

      <p>Payment Method</p>
      <Field
        name="payment_type"
        className='form-control border-0 shadow'
        component="select">
          <option></option>
          <option value="Numerar">Numerar</option>
          <option value="POS">POS mobil</option>
          <option value="Bonuri">Bonuri de masa</option>
      </Field>
        <button className='btn btn-primary shadow px-5 my-4' type="submit" disabled={ pristine || submitting }>
          Submit
        </button>
      </div>
    </form>
    </div>
  )
}

export default reduxForm({
  form: 'CheckoutForm',
})(CheckoutForm)
