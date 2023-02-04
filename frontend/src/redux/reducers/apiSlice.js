import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    name: "name",
    email: "@gamil.com",
    token: "token",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        setRegister: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        setLogout: () => initialState,
    },
});

export const { setLogin, setRegister, setLogout } = authSlice.actions;
export default authSlice.reducer;
