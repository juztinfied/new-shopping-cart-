import React from 'react';

const Card = ({title, pathName, price}) => {
    return (
        <div className="imageframe">
            <img src={process.env.PUBLIC_URL + pathName} />
            <div>{title}</div>
            <div>{price}</div>
            <div className="AddToCart">Add To Cart</div>
        </div>
    )

};

export default Card;