
import React from 'react';

export function ResErrors(props) {
  
  const errors = props.errors;

  return (
    errors.length > 0 &&
          <div className='alert alert-danger'>
         	 {errors}
          </div>
  )


}