import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './../reducers';

export default function createStore(initialState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
}
