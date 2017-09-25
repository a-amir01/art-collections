/**
 * Created by amirassad on 7/18/17.
 */

const initState = {
	paintings: [],
};

export function paintingReducers(state=initState, action){
	console.log("In paintingReducers\n ", action.type);

	switch(action.type){
        case "GET_PAINTINGS":
            console.log("GET_PAINTINGS", action.payload);
			return {...state, paintings:[...action.payload]};
			// break;
        case "RESET_BUTTON":
            return {...state, msg: null, style: 'primary', validation: null}
            // break;
	}
	return state;
}