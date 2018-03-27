import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { AsyncStorage } from "react-native";
import { autoRehydrate, persistStore, createTransform } from "redux-persist";

import reducers from "@reducers/index";

const createAppStore = compose(
  applyMiddleware(promiseMiddleware(), thunkMiddleware)
)(createStore);

export default function configureStore(callback) {
  const store = autoRehydrate()(createAppStore)(reducers);
  let persistor = persistStore(
    store,
    {
      storage: AsyncStorage,
      debounce: 10000
      // blacklist: ["account"]
    },
    (err, state) => {
      if (err) {
        persistor.purgeAll();
      }
      callback && callback();
    }
  );

  return store;
}
