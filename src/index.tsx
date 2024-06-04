import ReactDOM from 'react-dom/client';
import React, { Suspense } from 'react';
import { App } from './App';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Loader } from './utils/Loader/Loader';
import setupLocatorUI from '@locator/runtime';

//En productivo comentar la siguiente linea
 if (process.env.NODE_ENV === 'development') {
   setupLocatorUI();
 }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const persistor = persistStore(store);

root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <React.StrictMode>
        <Suspense fallback={<Loader />}>
          <HashRouter>
            <ToastContainer />
            <App />
          </HashRouter>
        </Suspense>
      </React.StrictMode>
    </Provider>
  </PersistGate>
);
