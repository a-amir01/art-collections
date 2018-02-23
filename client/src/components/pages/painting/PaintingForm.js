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
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import DropdownList from 'react-widgets/lib/DropdownList';
// import { Col, Row, Well } from 'react-bootstrap';
import { Image, Container, Message, Dropdown, Header } from 'semantic-ui-react';

import GenericForm, { renderField } from '../../utils/GenericForm';
import CategoryForm from "../category/CategoryForm";
import CategoryFormContainer from "../../../containers/category/CategoryFormContainer";

/*
* Must be passed an onSave call back which takes in the form as jason and the form name
* */

function validate(value) {
    console.log("in validate!!", value);
    return value ? undefined
        : "Field is Required!";
}

const FIELDS = {
    title: {
        fieldName: "title",
        label: "Title",
        inputType: "input",
        type: "text",
        validate: validate,
    },
    size: {
        fieldName: "size",
        label: "Size",
        inputType: "input",
        type: "text",
        validate: validate,
    },
    description: {
        fieldName: "description",
        label: "Description",
        inputType: "textarea",
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
        let categoryLabels = this.props.categories.map(({ category }) => {
            return {
                key: category,
                content: category,
                value: category,
                text: category,
            }
        });

        // alert(JSON.stringify(categoryLabels));

        return (
            <div className={className}>
                <label>
                    { field.label }
                </label>
                <Dropdown { ...input }
                    selection
                    fluid
                    options={ categoryLabels }
                    onChange={ (param, data) => { input.onChange(data.value) }}
                    placeholder='Choose an option'
                    error={ error && touched  }
                />
                {/*{ touched &&*/}
                    {/*(error &&*/}
                        {/*<span className="text-help">*/}
                            {/*{error}*/}
                        {/*</span>*/}
                    {/*)*/}
                {/*}*/}
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
            <Container style={{ background: "#f4f7f8", padding: "10px 20px", margin: "10px auto", borderRadius: "8px" }}>
                    <GenericForm
                        form={ form }
                        submitForm={ formSubmitFunction }
                        // onSubmit={ this.submit }
                        componentForField={ this.getComponentForField }
                        fields={ FIELDS }
                        initialValues={ initialValues }
                        submitButtonName="Save"
                    />


                    <Image src={image} size='large' centered rounded/>
                    {/*<Image src={ image } responsive rounded />*/}
            </Container>
        )
    }
}

export default PaintingForm;


