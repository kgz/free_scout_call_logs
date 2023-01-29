import React from 'react';
import ReactDOM from 'react-dom/client';
import Container from './modules/container';


const root = ReactDOM.createRoot(
  document.getElementById('helloWorld') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>
);


// add overflow auto to conv-layout-customer
document.querySelector('#conv-layout-customer')?.setAttribute('style', 'overflow:auto');
document.querySelector('#helloWorld')?.setAttribute('style', 'border-bottom: solid 1px #91909354');