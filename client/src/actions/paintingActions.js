/**
 * Created by amirassad on 7/18/17.
 */

import axios from 'axios';

export function dispatchGetPaintings() {
    return async (dispatch) => {
        let response;
        try {
            response = await axios.get("/api/gallery");
            dispatch({ type: "GET_PAINTINGS", payload: response.data });

        }catch(e) {
            throw e;
        }
    };
}

export function dispatchGetPaintingsByCategory(category) {
    return async (dispatch) => {
        let response;
        try{
            response = await axios.get("/api/gallery/" + category);
            dispatch({ type: "GET_PAINTINGS", payload: response.data });

        }catch(e) {
            throw e;
        }
    };
}

export function dispatchUpdatePainting(painting) {
    return async (dispatch) => {
        let response;
        try {
            response = await axios.put("/api/painting/" + painting._id, painting);
            dispatch({ type: "UPDATE_PAINTING", payload: response.data });

        }catch(e) {
            throw e;
        }
    };
}

export function dispatchDeletePainting(id) {
    return async (dispatch) => {
        let response;
        try {
            response = await axios.delete("/api/gallery/" + id);
            dispatch({ type:"DELETE_PAINTING", payload: id });

        }catch(e) {
            throw e;
        }
    }
}