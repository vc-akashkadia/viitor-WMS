import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/index";
import { LayoutSplashScreen, MaterialThemeProvider } from "./theme/layouts";
import { PersistGate } from "redux-persist/integration/react";


function App({ store,persistor }) {
  return (
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter >
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            <MaterialThemeProvider>
              {/* Provide `react-intl` context synchronized with Redux state.  */}
              
                {/* Render routes with provided `Layout`. */}
                <Routes />
              
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
