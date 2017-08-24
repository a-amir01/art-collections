/**
 * Created by amirassad on 7/18/17.
 */

const initState = {
	paintings: [],
};

export function paintingReducers(state=initState, action){
	console.log("In paintingReducers\n");

	switch(action.inputType){
        case "GET_PAINTINGS":
            console.log(...action.payload)
			return {...state, paintings:[...action.payload]}
			// break;
        case "POST_PAINTING":
            return {...state, paintings:[...state.paintings, ...action.payload]}
            // break;
        case "POST_PAINTING_REJECTED":
            return {...state, msg:"Please, try again", style:'danger', validation:'error'}
            // break;
        case "RESET_BUTTON":
            return {...state, msg: null, style: 'primary', validation: null}
            // break;
	}
	return state;
}