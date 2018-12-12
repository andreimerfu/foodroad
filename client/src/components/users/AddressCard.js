import React from 'react';
import { Link } from 'react-router-dom';

export function AddressCard(address) {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <p>Tag: {address.tag}</p>
        <button className="btn btn-danger float-right">Remove</button>
      </div>
      <div className="d-flex justify-content-between">
        <p>{address.address}</p>
      </div>
    </div>
  )
}
