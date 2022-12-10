// ** Redux, Thunk & Root Reducer Imports
import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import rootReducer from "../reducers/rootReducer";
import { createStore, applyMiddleware, compose } from "redux";
// ** Redux Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// ** init Redux Persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/*
According to the definition Redux stores are global states that store data you want to use across multiple 
components without drilling props at every level in your component tree. 
In this file I'm configuring the redux store and adding middlewares.
*/

// ** init middleware
const middleware = [thunk, createDebounce()];

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ** Create store
const store = createStore(
  //rootReducer,
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
