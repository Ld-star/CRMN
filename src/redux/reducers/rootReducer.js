import { combineReducers } from "redux";

// ** Reducers Imports
import main from "./main/index.js";

/*
In rootReducer we are combining all the reducers and then exporting these into single rootReducer right now 
we have only one reducer which is mainReducer but as we add more features we can add more reducers. 
*/

const appReducer = combineReducers({
  main,
});

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_STORE") {
    // for all keys defined in your persistConfig(s)
    //storage.removeItem("persist:root");
    //storage.removeItem('persist:otherKey')

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
