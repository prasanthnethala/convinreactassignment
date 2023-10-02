import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './Routes';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store } from './redux/store'
import { Provider } from 'react-redux'
const router = createBrowserRouter(Routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
 
root.render(
  <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>,
);
reportWebVitals();