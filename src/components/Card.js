import React from 'react';

const Card = (props) => {
    let freeshipping
    if (props.isFreeShipping){
        freeshipping = <div className="FreeShipping">Free Shipping</div>
    }
    return (
        <div className="card">
            {freeshipping}
            <img src={process.env.PUBLIC_URL + props.pathName} title={[props.title,props.price]} onClick={props.handleClickProduct} />
            <div>{props.title}</div>
            <div>{props.price}</div>
            <div className="AddToCart">Add To Cart</div>
        </div>
    )

};

export default Card;