import React, { Component } from 'react';
import CardsContainer from './components/CardsContainer';
import Sidebar from './components/shoppingcart/Sidebar';
import Button from './components/shoppingcart/Button';
import output from './Config/config';
import Firebase from 'firebase';
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
    inventory: {}
  }

  componentDidMount() {
    var inventory = {};
    this.db.on("value", (snapshot) => {
      snapshot.forEach(function(child) {
        inventory[child.key] = child.val();
      });
      this.setState({ inventory: inventory});
    })
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen} ;
    });
  }

  deleteProduct = (itemname) => {
    let newSelected = Object.assign({}, this.state.selected)
    let count = this.state.noOfItems - newSelected[itemname][1]
    let totalprice = this.state.totalprice - newSelected[itemname][0]
    delete newSelected[itemname]
    this.setState({
      selected: newSelected,
      noOfItems: count,
      totalprice: totalprice
    })
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
      newSelected[title] = [(newSelected[title][0] + price), (newSelected[title][1] + 1), imgPath]
    }
    else{
      newSelected[title] = [price,1, imgPath]
    }

    totalprice += price

    let newInventory = Object.assign({}, this.state.inventory);
    let item = newInventory[sku] 
    item[size] -= 1
    newInventory[sku] = item
    
    this.setState({
      selected: newSelected,
      noOfItems: count,
      totalprice: totalprice
      })

    Firebase.database().ref('/').set(this.state);

  }

  render() {
    const items = this.state.skus.map(sku => this.state.products[sku]);
    const pathNames = this.state.skus.map(sku => this.state.products[sku].sku);

    return (
      <div>
        <CardsContainer items={items} pathNames={pathNames} allProductData={this.state.products} handleClickProduct={this.handleClickProduct}/> 
        <Button drawerClickHandler={this.drawerToggleClickHandler} noOfItems={this.state.noOfItems}/>
        <Sidebar show={this.state.sideDrawerOpen} selected={this.state.selected} drawerClickHandler={this.drawerToggleClickHandler}
        deleteProduct={this.deleteProduct} totalPrice={this.state.totalprice} checkOutItems={this.checkOutItems}/>
      </div>
    )

  }
}


export default App;