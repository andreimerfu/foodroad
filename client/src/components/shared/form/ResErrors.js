
import React from 'react';
import { Alert } from 'reactstrap';

export function ResErrors(props) {
  
  const errors = props.errors;

  return (
    errors.length > 0 &&
     <Alert color="danger"> {errors} </Alert>
  )
}