import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

fetch('./data/products.json')
.then(resp => resp.json()) 
.then(({products}, Image) => {
   ReactDOM.render(<App products={products} />, document.getElementById('root'));
});

let docWidth = document.documentElement.offsetWidth;
[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el, 'hi');
    }
  }
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
