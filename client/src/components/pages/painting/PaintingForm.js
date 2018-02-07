/**
 * Created by amirassad on 7/18/17.
 */

/* https://redux-form.com/7.0.1/examples/
 * how to have multiple forms in one page
 * https://stackoverflow.com/questions/37456526/how-to-embed-the-same-redux-form-multiple-times-on-a-page/37464048#37464048
 * https://github.com/erikras/redux-form/issues/190
 * // https://github.com/erikras/redux-form/issues/2082
 */

import React from 'react';
import axios from 'axios';

import _ from 'lodash';
import DropdownList from 'react-widgets/lib/DropdownList';
import { Col, Row, Well, Panel, Button } from 'react-bootstrap';

import GenericForm, { renderField } from '../../utils/GenericForm';


/*
* Must be passed an onSave call back which takes in the form as jason and the form name
* */

function validate(value) {
    console.log("in validate!!", value);
    return value ? undefined : 'Required';
}

const FIELDS = {
    title: {
        fieldName: "title",
        label: "Title",
        inputType: "input",
        type: "",
        validate: validate,
    },
    size: {
        fieldName: "size",
        label: "Size",
        inputType: "input",
        type: "",
        validate: validate,
    },
    description: {
        fieldName: "description",
        label: "Description",
        inputType: "textarea",
        type: "",
        validate: validate,
    },
    category: {
        fieldName: "category",
        label: "category",
        inputType: "input",
        type: "",
        validate: validate,
    },
};


class PaintingForm extends React.Component {

    constructor(props) {
        super(props);
        this.getComponentForField = this.getComponentForField.bind(this);
        this.renderMultiselect = this.renderMultiselect.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.writeFileToDisk = this.writeFileToDisk.bind(this);
        this.state = {
            imgWritten: false,
        };
    }

    // componentDidMount() {
    //     alert("mount in paintingForm");
    // }
    //
    // componentWillUnmount() {
    //     alert("unmounting");
    // }
    //
    // shouldComponentUpdate() {
    //     alert("should update");
    //     return false;
    //
    // }

    renderMultiselect(field) {
        const { meta: { touched, error }, input } = field;
        const className = `form-group ${touched && error ? 'has-danger': ''}`;
        console.log("CATEGORIES:\n" , this.props.categories);
        const categoryLabels = this.props.categories.map(({ category }) => category);
        console.log("CATEGORIES:\n" , categoryLabels);


        return (
            <div className={className}>
                <label>
                    { field.label }
                </label>
                <DropdownList {...input}
                              data={ categoryLabels }
                              valueField="value"
                              textField="color"
                              onChange={input.onChange} />
                { touched &&
                    (error &&
                        <span className="text-help">
                            {error}
                        </span>
                    )
                }
            </div>
        )
    }

    getComponentForField(field) {
        console.log("getComponentForField " , field.fieldConfig.fieldName);

        const { fieldConfig, } = field;
        const { title, size, description, category } = FIELDS;

        switch (fieldConfig.fieldName){
            case title.fieldName:
            case size.fieldName:
            case description.fieldName:
                return renderField(field);
            case category.fieldName:
                return this.renderMultiselect(field);
                console.log("getComponentForField FIELDS.category.fieldName");

        }

    }


// https://github.com/erikras/redux-form/issues/190
    submitForm(values) {
        return new Promise(async (resolve, reject) => {

            const { _id, saveForm } = this.props;

            //"./uploads is from root of eli-collections/upload
            values["image"] = "/uploads/" + _.replace(this.props.imgFile.name, / /g, '');
            //TODO: handle rejected promise
            await this.writeFileToDisk(this.props.imgFile);

            values._id = _id;
            //TODO: handle rejected promise
            await saveForm(values);
            resolve("success");
        });
    }

    writeFileToDisk(file){
        return new Promise((accept, rej) => {
            const formDataImg = new FormData();
            console.log(file);
            formDataImg.append('file', file);
            axios.post("/file", formDataImg, {'accept': 'application/json', 'Content-Type' : 'multipart/form-data'})
                .then((res) => {
                    accept("successul");
                    console.log('success', res);
                })
                .catch((err) => {
                    rej(err);
                    alert(err);
                    console.log(err);
                });
        });
    }

     render(){
        const { imgFile, form } = this.props;

        console.log("form: ", form);

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={8}>
                        <GenericForm
                            form={ form }
                            submitForm={ this.submitForm }
                            // onSubmit={ this.submit }
                            componentForField={ this.getComponentForField }
                            fields={ FIELDS }
                            imgFile={ imgFile }
                            submitButtonName="Save"
                        />
                    </Col>
                </Row>
            </Well>
        )
    }
}

export default PaintingForm;


