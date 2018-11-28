import React from 'react';
import { Link } from 'react-router-dom';

export function AddressCard(address) {
  return (
    <div>
      <div className="row">
        <p>{address.tag}</p>
      </div>
      <div className="row">
        <p>{address.address}</p>
      </div>
    </div>
  )
}
