/**
 * Created by amirassad on 9/16/17.
 */

import axios from 'axios';

export function dispatchNewForms(forms) {
    return {
        type: "ADD_FORMS",
        payload: forms
    }
}

export function dispatchSaveForm(form) {
    return async function (dispatch) {
        let response;
        try {
            response = await axios.post("/api/gallery", form);
            //TODO: log the response

        }catch(e) {
            //TODO : throw exception
            alert(e);
        }

        dispatch({
            type: "SAVE_FORM",
            payload: form
        });
    };
}

