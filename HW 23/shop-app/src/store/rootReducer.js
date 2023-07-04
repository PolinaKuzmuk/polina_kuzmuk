import { userReducer as user } from "./user/userReducer";
import { productsReducer as products } from "./products/productsReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ user, products })