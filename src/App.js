import React from 'react';
import CardsContainer from './components/CardsContainer';

const App = ({products}, Image) => {
  const skus = Object.keys(products);
  //const items = skus.map(sku => <li>{products[sku].title}</li>);
  const items = skus.map(sku => products[sku]);
  const pathNames = skus.map(sku => products[sku].sku);
  //console.log(items);
  //const pathNames = skus.map(sku => '/data/products/' + products[sku].sku + '.jpg');

  return (
    <div>
      <CardsContainer items={items} pathNames={pathNames} /> 
    </div>
  )

};

export default App;