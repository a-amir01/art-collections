/**
 * Created by amirassad on 9/16/17.
 */

const initState = {
    forms: {},
};

export function paintingFormReducer(state=initState, action){
    console.log("In paintingFormReducers\n", action.type);

    switch(action.type){
        case "SAVE_FORM":
            console.log("SAVEFORM payload" , ...action.payload);
                console.log( "SAVE FORM NAME:",  action.formName);

            const currentForms = {...state.forms};
            console.log('currentForms BEFORE ', currentForms);

            currentForms[action.formName] = action.payload;


            console.log('currentForms AFTER', currentForms);

            return { ...state, forms: { ...currentForms } };
        // break;
        case "UPDATE_FORM":
            return {...state};
        // break;
        case "DELETE_FORM":
            return {...state};

    }
    console.log("IT DIDNT WORK!!");
    return state;
}
