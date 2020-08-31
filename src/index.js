import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store, { persistor } from './services/Redux';
import * as serviceWorker from './serviceWorker';
import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
  MetronicSubheaderProvider
} from "./theme/layouts";
ReactDOM.render(
  
    <MetronicLayoutProvider>
      <MetronicSubheaderProvider>
        <MetronicSplashScreenProvider>
          <App store={store} persistor={persistor} />
        </MetronicSplashScreenProvider>
      </MetronicSubheaderProvider>
    </MetronicLayoutProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
