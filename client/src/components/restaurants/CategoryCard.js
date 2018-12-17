
import React from 'react';
import Item from './Item';

export function CategoryCard(props) {
  const product = props.product.attributes;
  const showCategory = props.showCategory;

  if (showCategory == true) {
    return(
      <div>
        <h2 className="text-uppercase" id={product.category.name} tabindex="-1" role="dialog" aria-hidden="true">{product.category.name}</h2>
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
