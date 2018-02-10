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
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import DropdownList from 'react-widgets/lib/DropdownList';
import { Col, Row, Well, Image } from 'react-bootstrap';

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
    static propTypes = {
        form: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        imgFile: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
        categories: PropTypes.array.isRequired,
        initialValues: PropTypes.object,
        shouldUpdateForm: PropTypes.bool,
        updateForm: PropTypes.func,
        dispatchSaveForm: PropTypes.func,

    };

    constructor(props) {
        super(props);
        this.getComponentForField = this.getComponentForField.bind(this);
        this.renderMultiselect = this.renderMultiselect.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.writeFileToDisk = this.writeFileToDisk.bind(this);
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
        const categoryLabels = this.props.categories.map(({ category }) => category);
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

            const { _id, imgFile, dispatchSaveForm } = this.props;

            //"./uploads is from root of eli-collections/upload
            values["image"] = "/uploads/" + _.replace(imgFile.name, / /g, '');
            //TODO: handle rejected promise
            await this.writeFileToDisk(imgFile);

            values._id = _id;
            //TODO: handle rejected promise
            await dispatchSaveForm(values);
            resolve("success");
        });
    }

    writeFileToDisk(file){
        return new Promise(async (accept, rej) => {
            const formDataImg = new FormData();
            console.log(file);
            formDataImg.append('file', file);
            try {
                await axios.post("/file", formDataImg, { 'accept': 'application/json', 'Content-Type' : 'multipart/form-data' });
                accept();
            }catch(e) {
                throw e;
            }
        });
    }

     render(){
        const { imgFile, form, shouldUpdateForm, updateForm, initialValues } = this.props;

        let formSubmitFunction;
        let image;

        if(shouldUpdateForm) {
            image = imgFile;
            formSubmitFunction = updateForm;
        }else{
            image = imgFile.preview;
            formSubmitFunction = this.submitForm;
        }

        return (
            <Well>
                <Row>
                    <Col xs={8} sm={6}>
                        <GenericForm
                            form={ form }
                            submitForm={ formSubmitFunction }
                            // onSubmit={ this.submit }
                            componentForField={ this.getComponentForField }
                            fields={ FIELDS }
                            initialValues={ initialValues }
                            submitButtonName="Save"
                        />
                    </Col>
                    <Col xs={10} sm={6}>
                        <Image src={ image } responsive rounded />
                    </Col>
                </Row>
            </Well>
        )
    }
}

export default PaintingForm;


