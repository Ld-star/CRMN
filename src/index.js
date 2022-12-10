import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/storeConfig/configureStore";
import ThemeContextProvider from "./assets/theme/ThemeContext";
import "./assets/css/common.scss";
import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
