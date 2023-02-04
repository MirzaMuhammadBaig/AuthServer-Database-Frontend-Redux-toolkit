import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import thunk from 'redux-thunk'
import storage from "redux-persist/lib/storage";
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from "./reducers/apiSlice";

const reducers = combineReducers({
    auth: authReducer
});

const persistConfig = { key: "Auth_key", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk,
            serializableCheck: {
                ignoreActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            },
        }).concat([]),
    devTools: true,
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);
