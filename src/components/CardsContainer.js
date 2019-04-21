import React from 'react';
import Card from './Card';

const CardsContainer = ({items, pathNames}) => {
  const pairedList = [];

  items.forEach(item => {
    let pair = {};

    let pathName = pathNames.find((pathName) => {
      return pathName === item.sku
    })

    pair['name'] = item.title;
    pair['imagePath'] = '/data/products/' + pathName + '_1.jpg'
    pairedList.push(pair);
    return item;

  });

  const output = pairedList.map((pair) => {
    return (
      <Card title={pair.name} pathName={pair.imagePath} />
    )
  })

  return (
    <div className="cardcontainer">
      {output}
    </div>
  )

};

export default CardsContainer;