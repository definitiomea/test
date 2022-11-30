import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    product: null,
    thumbNail: null,
    loading: true
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getDisplayRequest(state, action) {
            state.loading = true;
        },
        getProduct(state, action) {
            state.product = action.payload;
            console.log(action.payload);
            state.loading = false;
        },
        getThumbNail(state, action) {
            state.thumbNail = action.payload;
            console.log(action.payload);
            state.loading = false;
        },
        getDisplayFailed(state, action) {
            state.loading = false;
        }
    }
});

export const productActions = productSlice.actions;
export default productSlice.reducer;