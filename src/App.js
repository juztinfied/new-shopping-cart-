import React from 'react';
import CardsContainer from './components/CardsContainer';
import './App.css';

const App = ({products}, Image) => {
  const skus = Object.keys(products);
  const items = skus.map(sku => products[sku]);
  const pathNames = skus.map(sku => products[sku].sku);

  return (
    <div>
      <CardsContainer items={items} pathNames={pathNames} /> 
    </div>
  )

};

export default App;