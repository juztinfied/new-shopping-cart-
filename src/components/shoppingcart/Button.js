import React, {Component} from 'react';

const Button = (props) => {
    return (
        <button className="button-container" onClick={props.drawerClickHandler}>
            <img src={process.env.PUBLIC_URL + '/images/shopping-cart-logo.svg.hi_.png'} />
            <badge className="badge">{props.noOfItems}</badge>
        </button>
    )

}

export default Button