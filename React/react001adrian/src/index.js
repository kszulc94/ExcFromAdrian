import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Heading from './components/heading/Heading';
import "./i18n.js";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/Cart';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // No Strict mode
  <>
  <CartProvider>
    <Heading />
    <App />

  </CartProvider>
   </>
);

reportWebVitals();
