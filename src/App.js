import React, { Component } from 'react';
import CardsContainer from './components/CardsContainer';
import Sidebar from './components/shoppingcart/Sidebar';
import Button from './components/shoppingcart/Button';

import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false,
    skus: Object.keys(this.props.products),
    products: this.props.products
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen} ;
    });
  }

  render() {
    const items = this.state.skus.map(sku => this.state.products[sku]);
    const pathNames = this.state.skus.map(sku => this.state.products[sku].sku);

    return (
      <div>
        <Button drawerClickHandler={this.drawerToggleClickHandler}/>
        <Sidebar show={this.state.sideDrawerOpen}/>
        <CardsContainer items={items} pathNames={pathNames} allProductData={this.state.products}/> 
      </div>
    )

  }
}


export default App;