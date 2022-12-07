import api from "../api";
import { productActions } from "../reducers/productReducer";

function getProduct() {
    return async (dispatch, getState) => {
        try {
            dispatch(productActions.getDisplayRequest());

            const productApi = api.get(`/productList`);
            let product = await Promise(productApi);

            dispatch(productActions.getProduct(product));
            console.log(product[0]);
        }
        catch(error) {
            dispatch(productActions.getDisplayFailed());
        }
    }
}

function getThumbNail() {
    return async (dispatch, getState) => {
        try {
            console.log("middle?");
            dispatch(productActions.getDisplayRequest());

            const thumbNailApi = api.get(`/productList`);
            let thumbNail = await Promise(thumbNailApi);

            dispatch(productActions.getThumbNail(thumbNail?.thumbnail));
        }
        catch(error) {
            dispatch(productActions.getDisplayFailed());
        }
    }
}

export const productAction = { getProduct, getThumbNail };