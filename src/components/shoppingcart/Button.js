import React, {Component} from 'react';

const Button = ({props}) => {
    return (
        <button className="button-container">
            <img src={process.env.PUBLIC_URL + '/images/shopping-cart-logo.svg.hi_.png'} />
            <circle><p>10</p></circle>
        </button>
    )

}

export default Button