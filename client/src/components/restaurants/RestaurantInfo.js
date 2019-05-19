
import React from 'react';
import { Link } from 'react-router-dom';

export function RestaurantInfo(props) {

  const restaurant = props.restaurant.attributes;
  return(
   <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{restaurant.name}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h6>Adresa: {restaurant.address}</h6>
            <p>Comanda minima: {restaurant.min_order} LEI </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Inchide</button>
          </div>
        </div>
      </div>
    </div>
  )
}
