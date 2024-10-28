import { combineReducers, legacy_createStore as createStore } from "redux";
import userReducer from "./usersReducer";
import SWReducer from "./SWReducer";


let reducers = combineReducers({
    userPage: userReducer,
    SWpage: SWReducer
});
let store = createStore(reducers);

export default store;