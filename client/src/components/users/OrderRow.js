
import React from 'react';

export function OrderRow(props) {
  var products = ""
  props.order.attributes.products.forEach(element => {
    products += element.name + ", "
  })
  return(
   <tr>
      <td>{props.order.id}</td>
      <td>{props.order.attributes.address}</td>
      <td><div>{products}</div></td>
      <td>{props.order.attributes.total}</td>
    </tr>
  )
}
