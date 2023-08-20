import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { CalendarApp } from './CalendarApp.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = document.getElementById('root');
const rootElement = (
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <CalendarApp />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

ReactDOM.createRoot(root).render(rootElement);
