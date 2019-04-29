import React, { Component } from 'react';
import CardsContainer from './components/CardsContainer';
import Sidebar from './components/shoppingcart/Sidebar';
import Button from './components/shoppingcart/Button';

import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false,
    skus: Object.keys(this.props.products),
    products: this.props.products,
    selected: {}
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen} ;
    });
  }

  handleClickProduct = (e) => {
    let array = e.target.title.split(/[,]+/);
    let price = parseFloat(array[1])
    let title = array[0]
    let imgPath = e.target.src

    let newSelected = Object.assign({}, this.state.selected)
    if (this.state.selected[title] !== undefined){
      newSelected[title] = [(newSelected[title][0] + price), (newSelected[title][1] + 1), imgPath]
    }
    else{
      newSelected[title] = [price,1, imgPath]
    }
      
    this.setState({
      selected: newSelected
      }, () => {
        console.log(this.state.selected)
      }
    )

  }

  render() {
    const items = this.state.skus.map(sku => this.state.products[sku]);
    const pathNames = this.state.skus.map(sku => this.state.products[sku].sku);

    return (
      <div>
        <CardsContainer items={items} pathNames={pathNames} allProductData={this.state.products} handleClickProduct={this.handleClickProduct}/> 
        <Button drawerClickHandler={this.drawerToggleClickHandler}/>
        <Sidebar show={this.state.sideDrawerOpen} selected={this.state.selected} drawerClickHandler={this.drawerToggleClickHandler}/>
      </div>
    )

  }
}


export default App;