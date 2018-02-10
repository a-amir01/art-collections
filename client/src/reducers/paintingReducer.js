/**
 * Created by amirassad on 7/18/17.
 */

import _ from "lodash";

const initState = {
	paintings: [],
};

export function paintingReducer(state=initState, action){
	console.log("In paintingReducer\n ", action.type);

	switch(action.type){
        case "GET_PAINTINGS":
			return { ...state, paintings: [...action.payload] };
		case "UPDATE_PAINTING":
            return { ...state, paintings: getUpdatedPaintings(state.paintings, action.payload) };
        case "RESET_BUTTON":
            return { ...state, msg: null, style: 'primary', validation: null };
        default:
            return state;
	}
}

function getUpdatedPaintings(paintings, payload) {
    let updatedPaintings = [];
    _.forEach(paintings, (painting) => {
        if(painting._id !== payload._id){
            updatedPaintings.push(painting);
        }else if(painting._id === payload._id && painting.category === payload.category){
            updatedPaintings.push(payload);
        }
    });

    return updatedPaintings;
}