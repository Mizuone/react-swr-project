import './index.css'

import { App } from './App'
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { makeServer } from './tests/mirageServer';

console.log(import.meta.env);

if (import.meta.env.MODE === "development" && import.meta.env.VITE_REACT_APP_USEMOCKAPI === 'true') {
  console.log("server made");
  makeServer({ environment: 'development' });
}

const baseURL = import.meta.env.BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={baseURL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
