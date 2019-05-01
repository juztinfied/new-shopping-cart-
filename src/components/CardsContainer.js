import React from 'react';
import Card from './Card';

const CardsContainer = ({items, pathNames, allProductData, handleClickProduct}) => {
  const pairedList = [];
  items.forEach(item => {
    let pair = {};

    let pathName = pathNames.find((pathName) => {
      return pathName === item.sku
    })

    pair['name'] = item.title;
    // pair['imagePath'] = '/data/products/' + pathName + '_1.jpg'
    pair['imagePath'] = pathName
    pair['price'] = allProductData[pathName]['price']
    pairedList.push(pair);
    return item;

  });

  const output = pairedList.map((pair) => {
    return (
      <Card title={pair.name} sku={pair.imagePath} price={pair.price} handleClickProduct={handleClickProduct}/>
    )
  })

  let noOfItems = output.length

  return (
    <div className="cardcontainer">
      <div className="noOfItems">{noOfItems} Product(s) found</div>
      {output}
    </div>
  )

};

export default CardsContainer;