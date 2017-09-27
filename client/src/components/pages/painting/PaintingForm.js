/**
 * Created by amirassad on 7/18/17.
 */

/* https://redux-form.com/7.0.1/examples/
 * how to have multiple forms in one page
 * https://stackoverflow.com/questions/37456526/how-to-embed-the-same-redux-form-multiple-times-on-a-page/37464048#37464048
 * https://github.com/erikras/redux-form/issues/190
 */

import React from 'react';
import request from 'superagent';

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
        this.submit = this.submit.bind(this);
        this.writeFileToDisk = this.writeFileToDisk.bind(this);
        this.state = {
            imgWritten: false,
        };
    }

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

    submit(values) {
        console.log("VALUES: ", values);
        const formID = values.title;
        //addImageToForm
        //"./uploads is from root of eli-collections/upload

        if(!this.state.imgWritten) {
            values["image"] = "/uploads/" + _.replace(this.props.imgFile.name, / /g, '');
            this.writeFileToDisk(this.props.imgFile);
            this.setState({imgWritten: true});
        }
        this.props.onSave(values, formID);
        alert("Save Success");
    }

    writeFileToDisk(file){
        const formDataImg = new FormData();
        console.log(file);
        formDataImg.append('file', file);

        const req = request
            .post('/file')
            .send(formDataImg);

        req.end(function(err,response){
            if (err) {
                console.log(err);
            }

           console.log("upload done!!!!!");
        });
        // axios.post("/api/file", formDataImg, {'accept': 'application/json', 'Content-Type' : 'multipart/form-data'})
        //     .then((res) => {
        //         alert("success");
        //         console.log('success', res);
        //     })
        //     .catch((err) => {
        //         alert(err);
        //         console.log(err);
        //     });
    }
// <form onSubmit={ (e) => {
//     e.preventDefault();
//     // e.stopPropagation();
//     handleSubmit(this.submit);
// }}>

    render(){
        const { imgFile, form } = this.props;

        console.log("form: ", form);

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={8}>
                        <GenericForm
                            form={ form }
                            onSubmit={ this.submit }
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


