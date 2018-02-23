const initState = {
    page: '',
};

export function pageReducer(state=initState, action){
    console.log("In pageReducer\n", action.type);

    switch(action.type){
        case "NEW_PAGE":
            alert("In pageReducer" + action.payload);
            return { ...state, page: action.payload };
        default:
            return state;
    }
}