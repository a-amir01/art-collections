/**
 * Created by amirassad on 9/24/17.
 */

import axios from 'axios';

export function dispatchAddCategory(category) {
    console.log("categoryActions: dispatchAddCategory");
    return async (dispatch) => {
        let response;
        try {
            response = await axios.post("/api/category", category);
            dispatch({ type: "ADD_CATEGORY", payload: response.data })

        }catch(e) {
            throw e;
        }
    };
}

export function dispatchGetCategories() {
    console.log("categoryActions: dispatchGetCategories");
    return async (dispatch) => {
        let response;
        try {
            response = await axios.get("/api/category");
            dispatch({ type: "GET_CATEGORIES", payload: response.data })

        }catch(e) {
            throw e;
        }
    };
}

export function dispatchRemoveCategory(_id) {
    console.log("categoryActions: dispatchRemoveCategory\n", _id);

    return async (dispatch) => {
        let response;
        try {
            response = await axios.delete("/api/category/" + _id);
            dispatch({ type: "REMOVE_CATEGORY", payload: _id });
            //TODO: check response

        }catch(e) {
            throw e;
        }
    };
}