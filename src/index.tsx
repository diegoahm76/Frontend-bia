import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <PersistGate loading="null" persistor={persistor}>
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <ToastContainer />
        <App />
      </HashRouter>
    </React.StrictMode>
  </Provider>
  // </PersistGate>
);
