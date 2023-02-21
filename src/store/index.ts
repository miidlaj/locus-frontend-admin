import userReducer from "./reducers/user";
import {combineReducers, createStore} from "redux";


const allReducers = combineReducers({
    user: userReducer,
});

const store = createStore(allReducers);

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

