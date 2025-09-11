import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <div className='flex-1'>
          <App />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
