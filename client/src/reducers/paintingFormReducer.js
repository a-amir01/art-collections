/**
 * Created by amirassad on 9/16/17.
 */

import _ from "lodash";

const initState = {
    currentForms: [],
};

export function paintingFormReducer(state=initState, action){
    console.log("In paintingFormReducers " + action.type);

    switch(action.type){
        case "ADD_FORMS":
            return { ...state, currentForms: _.concat(state.currentForms, action.payload) };
        case "SAVE_FORM":
            return { ...state, currentForms: _.filter(state.currentForms, (form) => form._id !== action.payload._id) };
        case "UPDATE_FORM":
            return {...state};
        case "DELETE_FORM":
            return {...state};
        default:
            return state;
    }

}
