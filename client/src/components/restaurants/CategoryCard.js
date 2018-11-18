
import React from 'react';

export function CategoryCard(props) {
  const product = props.product.attributes;
  const showCategory = props.showCategory;

  if (showCategory == true) {
    return(
      <div>
       <div className="line"></div>
        <h2>{product.category.name}</h2>
          <div className="row">
            <div className="col md-6">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
            </div>
          <div className="col md-4">
            <p>{product.price} LEI</p>
          </div>
          <div className="col md-2">
            <button className="btn btn-primary">Buy</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="row">
          <div className="col md-6">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
          </div>
          <div className="col md-4">
            <p>{product.price} LEI</p>
          </div>
          <div className="col md-2">
            <button className="btn btn-primary">Buy</button>
          </div>
        </div>
      </div>
    )
  }
}
