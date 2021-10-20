import {combineReducers, createStore} from "redux";
import { authReducer } from "./authState";

//multiplate reducers
const reducers = combineReducers({
    authState:authReducer
})
const store = createStore(reducers);

export default store;
