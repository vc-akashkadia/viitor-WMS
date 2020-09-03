import React from "react";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter,
} from "react-router-dom";
import theme from "@config/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./routes/index";
import "./App.css";


function App({ store, persistor }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading</div>}>
        <React.Suspense fallback={<div>Loading</div>}>
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Routes />
            </MuiThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
