/**
 * Created by amirassad on 9/24/17.
 */

import _ from 'lodash';

const initState = {
    categories: [],
};

export function categoryReducer(state=initState, action){
    console.log("In categoryFormReducers\n", action.type);

    switch(action.type){
        case "ADD_CATEGORY":
            const newCategories = [...state.categories, action.payload];
            return { ...state, categories: _.sortBy(newCategories) };
        case "GET_CATEGORIES":
            return { ...state, categories: [...action.payload] };
        case "REMOVE_CATEGORY":
            const newList = _.reject(state.categories, { _id : action.payload });
            return { ...state, categories: newList  };
        default:
            return state;
    }
}