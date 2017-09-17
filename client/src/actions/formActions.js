/**
 * Created by amirassad on 9/16/17.
 */

import axios from 'axios';
import _ from 'lodash';

export function saveForm(formValues, formID) {
    console.log("saveForm \n", formValues, formID);
    return {
        type: "SAVE_FORM",
        formName: formID,
        payload: formValues
    }
}

export function submitForms(forms) {
    console.log("IN FORMACTION: ", forms);
    _.forOwn(forms, (v, k) => {
        console.log(v, k, "\n\n\n\n\n\n\n");

        _.mapValues(v, (form) => {
            submitForm(form);
        });
    });

    return {
        type: "SUBMIT_FORMS"
    };
}

function submitForm(form) {
    console.log("IN submitForm: ", form);
    axios.post("/api/gallery", form)
        .then((response)=>{
            console.log("RESPONSE ", response);
            // dispatch({type:"POST_BOOK", payload: response.data})
        })
        .catch((err)=>{
            alert(err);
            //dispatch({type: "POST_FORM_REJECTED", payload: "there was an error while posting a new book"})
        });
}
