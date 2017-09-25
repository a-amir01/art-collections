/**
 * Created by amirassad on 9/24/17.
 */

import axios from 'axios';


export function addCategory(category) {
    console.log("categoryActions: addCategory");
    return (dispatch) => {
        axios.post("/api/category", category)
            .then(res => {
                console.log("categoryActions: addCategory: ADD Categories" , res.data);
                dispatch({type: "ADD_CATEGORY", payload: res.data})
            })
            .catch(err => {
                console.log("categoryActions: DIDNT ADD Categories");
                dispatch({type: "ADD_ADD_CATEGORY_REJECTED", payload: err});
            })
    };
}

export function getAllCategories() {
    console.log("categoryActions: getAllCategories");
    return (dispatch) => {
        axios.get("/api/category")
            .then(res => {
                console.log("categoryActions: getAllCategories: Got Categories" , res.data);
                dispatch({type: "GET_CATEGORIES", payload: res.data})
            })
            .catch(err => {
                console.log("categoryActions: DIDNT Get Categories");
                dispatch({type: "GET_CATEGORIES_REJECTED", payload: err});
            })
    };
}

export function removeCategory(_id) {
    console.log("categoryActions: removeCategory\n", _id);
    return (dispatch) => {
        axios.delete("/api/category/" + _id)
            .then(res => {
                console.log("categoryActions: removeCategory: REMOVE Categories" , res.data);
                if(res.data === "success")
                    dispatch({type: "REMOVE_CATEGORY", payload: _id});
                else
                    console.log("Was not able to remove ", _id);
            })
            .catch(err => {
                console.log("categoryActions: DIDNT REMOVE Categories");
                dispatch({type: "REMOVE_CATEGORY_REJECTED", payload: err});
            })
    };
}