import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';

const composedEnhancer = compose(applyMiddleware(thunkMiddleware));

export const store = configureStore({ reducer: rootReducer }, composedEnhancer);