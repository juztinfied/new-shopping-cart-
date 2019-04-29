import React from 'react'

const Sidebar = (props) => {
    let drawerClasses = 'sidebar';
    if (props.show) {
        drawerClasses = 'sidebar open';
    }

    let shoppingCart = []
    if (props.selected  ){
        for (let itemName in props.selected){
            console.log(itemName)
            let totalPrice = props.selected[itemName][0];
            let unitPrice = props.selected[itemName][1];
            let imgPath = props.selected[itemName][2];
            shoppingCart.push([itemName, unitPrice, totalPrice, imgPath])
        }
    }

    console.log(shoppingCart);

    let shoppingCart2 = shoppingCart.map(item => {
        return (
            <div>
                <img src={item[3]} /> 
                <div>{item[0]}</div>
                <div>Unit price: {item[1]}</div>
                <div>Total price: {item[2]}</div>
            </div>
        )

    })

    return ( 
            <div className={drawerClasses}>
                <button className="xbutton" onClick={props.drawerClickHandler}>X</button>
                {shoppingCart2}
            </div>
    )
}

export default Sidebar