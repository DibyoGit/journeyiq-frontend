import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { DIDSetter } from "./reducer/DIDSetter";
import { LoadingReducer } from "./reducer/LoadingReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    DomainIDSetter:DIDSetter,
    LoadingStatusSetter:LoadingReducer
});

const initialState = {};

const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

