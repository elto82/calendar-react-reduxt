import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { CalendarApp } from './CalendarApp.jsx';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');
const rootElement = (
  // <React.StrictMode>
  <BrowserRouter>
    <CalendarApp />
  </BrowserRouter>
  // </React.StrictMode>
);

ReactDOM.createRoot(root).render(rootElement);
