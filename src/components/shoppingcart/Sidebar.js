import React from 'react'

const Sidebar = (props) => {
    let drawerClasses = 'sidebar';
    if (props.show) {
        drawerClasses = 'sidebar open';
    }

    let shoppingCart = []
    if (props.selected  ){
        for (let itemName in props.selected){
            let totalPrice = props.selected[itemName][0];
            let unitPrice = props.selected[itemName][1];
            let imgPath = props.selected[itemName][2];
            shoppingCart.push([itemName, unitPrice, totalPrice, imgPath])
        }
    }

    let shoppingCart2 = shoppingCart.map(item => {
        return (
            <div className="cartitem">
                <div className="name"><b>{item[0]}</b></div>
                <div className="unit-price">Count: {item[1]}</div>
                <div className="total-price">Total price: {item[2]}</div>
                <button className="cart-xbutton" onClick={() => {props.deleteProduct(item[0])}}>X</button>
                <img src={item[3]} /> 
            </div>
        )
    })

    return ( 
            <div className={drawerClasses}>
                <button className="xbutton" onClick={props.drawerClickHandler}>X</button>
                <div className="cart">
                    {shoppingCart2}
                </div>
                <div className="totalprice">Total price: {props.totalPrice}</div>
                <button className="checkout-button" onClick={props.checkOutItems}>CHECK OUT!</button>
            </div>
    )
}

export default Sidebar