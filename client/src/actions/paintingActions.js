/**
 * Created by amirassad on 7/18/17.
 */

import axios from 'axios';

export function getPaintings() {
    console.log("paintingActions: getPaintings");
    return (dispatch) => {
        axios.get("/api/gallery")
            .then(res => {
                console.log("paintingActions::getPaintings: Got Paintings" , res.data);
                dispatch({type: "GET_PAINTINGS", payload: res.data})
            })
            .catch(err => {
                console.log("paintingActions: DIDNT Got Paintings");
                dispatch({type: "GET_PAINTINGS_REJECTED", payload: err})
            })
    };
}

export function getPaintingsByCategory(category) {
    console.log("paintingActions::getPaintingsByCategory\nCategory: ", category);
    return (dispatch) => {
        axios.get("/api/gallery/" + category)
            .then(res => {
                console.log("paintingActions::getPaintingsByCategory Got Paintings");
                dispatch({type: "GET_PAINTINGS", payload: res.data})
            })
            .catch(err => {
                console.log("paintingActions::getPaintingsByCategory DIDNT Got Paintings");
                dispatch({type: "GET_PAINTINGS", payload: err})
            })
    };
}

export function postPainting(painting, category) {
    console.log("paintingActions: postPainting");
    return (dispatch) => {
        axios.post("api/gallery/" + category, painting)
            .then(res => {
                dispatch({type:"POST_PAINTING", payload: res.data})
            })
            .catch(err => {
                dispatch({type:"POST_PAINTING_REJECTED", payload: "The was an error posting a new painting"})
            })
    }
}

export function deletePainting(id) {
    console.log("paintingActions: deletePainting");
    return (dispatch) => {
        axios.delete("api/gallery/" + id)
            .then(res=>{
                dispatch({type:"DELETE_PAINTING", payload: id})
            })
            .catch(err=>{
                dispatch({type: "DELETE_PAINTING_REJECTED", payload: err})
            })
    }
}

export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}

// export function deletePainting(id) {
//     console.log("paintingActions: deletePainting");
//     return (dispatch) => {
//         axios.delete("api/paintings/" + id)
//             .then(res=>{
//                 dispatch({type:"DELETE_PAINTING", payload: id})
//             })
//             .catch(err=>{
//                 dispatch({type: "DELETE_PAINTING_REJECTED", payload: err})
//             })
//     }
// }

export function resetButton(){
    console.log("paintingActions: resetButton");
    return {
        type: "RESET_BUTTON",
    }
}