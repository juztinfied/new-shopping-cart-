import React, {useState} from 'react';
import output from '../Config/config';

const Card = ({title, sku, price, handleClickProduct}) => {
    let itemDb = output.database().ref().child('inventory/' + sku)
    const [itemInven, setItemInven] = useState({})

    let tempInven = {};
    this.db.on("value", (snapshot) => {
      snapshot.forEach(function(child) {
        tempInven[child.key] = child.val();
      });
      setItemInven(Object.assign({}, tempInven))
    })


    let imgPath = '/data/products/' + sku + '_1.jpg';
    let value = [title, price, sku];

    return (
        <div className="card">
            <div className="FreeShipping">Free Shipping</div>
            <img src={process.env.PUBLIC_URL + imgPath} title={[title,price]} />
            <div>{title}</div>
            <div>{price}</div>
            <div className="AddToCart">Add To Cart
                <button className="s-button" value={[...value, "S"]} onClick={handleClickProduct}>S</button>
                <button className="m-button" value={[...value,"M"]} onClick={handleClickProduct}>M</button>
                <button className="l-button" value={[...value,"L"]} onClick={handleClickProduct}>L</button>
                <button className="xl-button" value={[...value,"XL"]} onClick={handleClickProduct}>XL</button>
            </div>
        </div>
    )

};

export default Card;