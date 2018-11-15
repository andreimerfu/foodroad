
import React from 'react';

export function CategoryCard(props) {
  const product = props.product.attributes;
  const showCategory = props.showCategory;

  if (showCategory == true) {
    return(
      <div>
       <div className="line"></div>
        <h2>{product.category.name}</h2>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p>{product.price.toString()}</p>
        <button className="btn btn-primary">Buy</button>
      </div>
    )
  } else {
    return (
      <div>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button className="btn btn-primary">Buy</button>
      </div>
    )
  }
}
