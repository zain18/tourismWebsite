import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import "bootstrap/dist/css/bootstrap.css";
// Add custom css import below this line
import "./index.css";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
