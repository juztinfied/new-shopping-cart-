import React, { Component } from 'react';
import CardsContainer from './components/CardsContainer';
import Sidebar from './components/shoppingcart/Sidebar';
import Button from './components/shoppingcart/Button';
import output from './Config/config';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import './App.css';

class App extends Component {
  db = output.database().ref().child('inventory')
  state = {
    sideDrawerOpen: false,
    skus: Object.keys(this.props.products),
    products: this.props.products,
    selected: {},
    noOfItems: 0,
    totalprice: 0,
    inventory: {},
    isSignedIn: false
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount() {
    var inventory = {};
    this.db.on("value", (snapshot) => {
      snapshot.forEach(function(child) {
        inventory[child.key] = child.val();
      });
      this.setState({
        inventory: inventory
      });
    })
    console.log(this.state.inventory);
  }

  componentWillMount() {
    console.log('asdasdf')
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user})
    })
  }

  // componentWillUpdate (nextProps, nextState) {
  //   if (nextState.inventory !== this.state.inventory){
  //     var inventory = {};
  //     this.db.on("value", (snapshot) => {
  //       snapshot.forEach(function(child) {
  //         inventory[child.key] = child.val();
  //       });
  //       this.setState({
  //         inventory: inventory
  //       });
  //     })
  //   }
  // }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen} ;
    });
  }

  checkOutItems = () => {
    alert('You have checked out' + this.state.noOfItems  + 'items. Total price: ' + this.state.totalprice)

    this.setState({
      selected: {},
      noOfItems: 0,
      totalprice: 0
    })
  }

  handleClickProduct = (e) => {
    console.log(e.target.value);
    let array = e.target.value.split(/[,]+/);
    let title = array[0]
    let price = parseFloat(array[1])
    let sku = array[2]
    let imgPath = '/data/products/' + sku + '_1.jpg';
    let size = array[3]
    let count = this.state.noOfItems + 1
    let totalprice = this.state.totalprice

    let newSelected = Object.assign({}, this.state.selected)
    if (this.state.selected[title] !== undefined){
      let newSizeCount = newSelected[title][3]
      newSizeCount[size] += 1
      newSelected[title] = [(newSelected[title][0] + price), (newSelected[title][1] + 1), imgPath, newSizeCount]
      console.log(newSelected)
    }
    else{
      let sizeCount = {"S": 0, "M": 0, "L": 0, "XL": 0}
      sizeCount[size] += 1
      newSelected[title] = [price,1,imgPath,sizeCount]
      console.log(newSelected)
    }

    totalprice += price

    let newInventory = Object.assign({}, this.state.inventory);
    let item = newInventory[sku] 
    item[size] -= 1
    newInventory[sku] = item
    
    this.setState({
      selected: newSelected,
      noOfItems: count,
      totalprice: totalprice,
      inventory: newInventory
    })


    let updates = {};
    updates['inventory/' + sku] = item
    
    output.database().ref().update(updates);
  }

  deleteProduct = (deletedItem) => {
    let itemName = deletedItem[0]
    let newSelected = Object.assign({}, this.state.selected)
    let count = this.state.noOfItems - newSelected[itemName][1]
    let totalprice = this.state.totalprice - newSelected[itemName][0]
    let sizeCount = deletedItem[4]
    delete newSelected[itemName]
    let sku = deletedItem[3].slice(15, -6)

    let newInventory = Object.assign({}, this.state.inventory);
    let item = newInventory[sku] 
    for (let size in sizeCount){
      item[size] += sizeCount[size]
    }
    newInventory[sku] = item

    this.setState({
      selected: newSelected,
      noOfItems: count,
      totalprice: totalprice
    })

    let updates = {};
    updates['inventory/' + sku] = item
    
    output.database().ref().update(updates);
  }

  render() {
    const items = this.state.skus.map(sku => this.state.products[sku]);
    const pathNames = this.state.skus.map(sku => this.state.products[sku].sku);

    return (
      <div>
        {this.state.isSignedIn ? (
          <div> 
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <CardsContainer items={items} pathNames={pathNames} allProductData={this.state.products}
              handleClickProduct={this.handleClickProduct} inventory={this.state.inventory}/> 
            <Button drawerClickHandler={this.drawerToggleClickHandler} noOfItems={this.state.noOfItems}/>
            <Sidebar show={this.state.sideDrawerOpen} selected={this.state.selected} drawerClickHandler={this.drawerToggleClickHandler}
              deleteProduct={this.deleteProduct} totalPrice={this.state.totalprice} checkOutItems={this.checkOutItems}/>
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()} />
        )
        }

      </div>
    )

  }
}


export default App;