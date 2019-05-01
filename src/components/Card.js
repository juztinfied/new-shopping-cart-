import React from 'react';

const Card = ({title, pathName, price, handleClickProduct}) => {
    return (
        <div className="card">
            <div className="FreeShipping">Free Shipping</div>
            <img src={process.env.PUBLIC_URL + pathName} title={[title,price]} onClick={handleClickProduct} />
            <div>{title}</div>
            <div>{price}</div>
            <div className="AddToCart">Add To Cart
                <button className="s-button">S</button>
                <button className="m-button">M</button>
                <button className="l-button">L</button>
                <button className="xl-button">XL</button>
            </div>
        </div>
    )

};

export default Card;