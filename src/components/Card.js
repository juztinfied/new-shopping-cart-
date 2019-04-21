import React from 'react';

const Card = ({items, pathNames}) => {
  const pairedList = [];

  items.forEach(item => {
    let pair = {};

    let pathName = pathNames.find((pathName) => {
      return pathName === item.sku
    })

    pair['name'] = item.title;
    pair['imagePath'] = pathName;
    pairedList.push(pair);
    return item;

  });

  const output = pairedList.map((element) => {
    let pathName = '/data/products/' + element.imagePath + '_1.jpg'
    return (
      <div>
        <img src={process.env.PUBLIC_URL + pathName} />
        <p>{element.name}</p>
      </div>
    )
  })

  return (
    <div>
      {output}
    </div>
  )

};

export default Card;