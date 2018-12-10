
import React from 'react';
import Item from './Item';

export function CategoryCard(props) {
  const product = props.product.attributes;
  const showCategory = props.showCategory;

  if (showCategory == true) {
    return(
      <div>
       <div className="line"></div>
        <h2>{product.category.name}</h2>
        <Item product={product}/>
      </div>
    )
  } else {
    return (
      <div>
      <Item product={product}/>
      </div>
    )
  }
}
