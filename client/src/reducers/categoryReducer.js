/**
 * Created by amirassad on 9/24/17.
 */

import _ from 'lodash';

const initState = {
    categories: [],
};

export function categoryReducer(state=initState, action){
    console.log("In paintingFormReducers\n", action.type);

    switch(action.type){
        case "ADD_CATEGORY":
            console.log("ADD_CATEGORY payload" , ...action.payload, "CATEGORIES: ", state.categories);
            let newCategories = [...state.categories, action.payload];
            return { ...state, categories: _.sortBy(newCategories) };

        case "GET_CATEGORIES":
            console.log("GET_CATEGORY payload" , ...action.payload);
            return { ...state, categories: [...action.payload] };

        case "REMOVE_CATEGORY":
            console.log("REMOVE_CATEGORY payload" , state.categories);
            const newList = _.reject(state.categories, { _id : action.payload });
            console.log("REMOVE_CATEGORY payload" , action.payload, newList);
            return { ...state, categories: newList  };

    }
    console.log("categoryReducer SAME STATE\n");
    return state;
}