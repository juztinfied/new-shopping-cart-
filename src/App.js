import React from 'react';
import CardsContainer from './components/CardsContainer';
import Button from './components/shoppingcart/Button';
import './App.css';

const App = ({products}, Image) => {
  const skus = Object.keys(products);
  const items = skus.map(sku => products[sku]);
  const pathNames = skus.map(sku => products[sku].sku);

  return (
    <div>
      <Button />
      <CardsContainer items={items} pathNames={pathNames} allProductData={products}/> 
    </div>
  )

};

export default App;