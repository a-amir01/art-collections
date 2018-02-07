/**
 * Created by amirassad on 9/16/17.
 */

import axios from 'axios';
import _ from 'lodash';

export function addForms(forms) {
    return {
        type: "ADD_FORMS",
        payload: forms
    }
}

export function saveForm(form) {
    return async function (dispatch) {
        console.log("saveForm action \n", form);
        try {
            const res = await axios.post("/api/gallery", form);
            console.log("RESPONSE SUBMIT FORM", res);

        }catch(e) {
            //TODO : throw exception
            alert(e);
        }

        dispatch({
            type: "SAVE_FORM",
            payload: form
        })

    };
}

