
import React from 'react';
import { Link } from 'react-router-dom';

export function RestaurantCard(props) {

  const restaurant = props.restaurant.attributes;
  return(
    <div className='col-ms-3 col-xs-6'>
      <Link className='restaurant-detail-link' to={`/menu/${props.restaurant.id}`}>
       {/* <div className='card'>
          <img className='card-img-top' src={restaurant.image} alt='Card cap'/>
          <div className='card-body'>
            <h6 className={`card-subtitle ${restaurant.category}`}>&#183; {restaurant.category} &#183; {restaurant.city}</h6>
            <h4 className='card-title'>{restaurant.title}</h4>
            <p className='card-text-rate'>&#183; <span className='card-daily-rate'>{restaurant.daily_rate} RON </span> Comanda minima &#183; </p>
            <p className='card-text-km'>{restaurant.km}</p>
          </div>
        </div>*/}
        <div className='restaurant-card'>
          <img className='card-img-top' src={restaurant.image} alt='Card cap'/>
          <div className='restaurant-card-body'>
            <div className='restaurant-card-title'>{restaurant.name}</div>
            <p className='restaurant-card-text'>{restaurant.address}</p>
            <div class="restaurant-card-footer">
              <p className='card-text-rate'><span className='card-daily-rate'>{restaurant.min_order} RON </span> Comanda minima </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
