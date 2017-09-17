/**
 * Created by amirassad on 7/18/17.
 */

/* https://redux-form.com/7.0.1/examples/
 * how to have multiple forms in one page
 * https://stackoverflow.com/questions/37456526/how-to-embed-the-same-redux-form-multiple-times-on-a-page/37464048#37464048
 */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import _ from 'lodash';

import { MenuItem, InputGroup, DropdownButton,
        Image, Col, Row, Well, Panel, FormControl,
        FormGroup, ControlLabel, Button} from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { saveForm } from '../../actions/formActions';


const FIELDS = {
    title: {
        fieldName: "title",
        label: "Title",
        inputType: "input",
        type: "",
    },
    size: {
        fieldName: "size",
        label: "Size",
        inputType: "input",
        type: "",
    },
    description: {
        fieldName: "description",
        label: "Description",
        inputType: "textarea",
        type: "",
    },
    category: {
        fieldName: "category",
        label: "Category",
        inputType: "input",
        type: "",
    },
    // image: {
    //     fieldName: "image",
    //     label: "Image",
    //     inputType: "",
    //     type: "",
    // }
};

class PaintingForm extends React.Component {

    constructor(props) {
        super(props);
        this.getComponentForField = this.getComponentForField.bind(this);
        this.submit = this.submit.bind(this);
        // this.addImageToForm = this.addImageToForm.bind(this);
        this.state = {
            images: [],
            img: '',
            category: '',
        };
    }

    renderField(field) {
        console.log("IN renderField ", field.input);

        // if(field.input.name === "image"){
        //     return (
        //         <img src={ this.props.imgFile.preview } key={this.props.imgFile.name}/>
        //
        //     )
        // }
        const { meta: { touched, error }, fieldConfig  } = field;

        const className = `form-group ${touched && error ? 'has-danger': ''}`;

        return (

            <div className={className}>
                <label>
                    { field.label }
                </label>
                <fieldConfig.inputType
                    className="form-control"
                    type={ fieldConfig.type }
                    { ...field.input }
                />
                <div className="text-help">
                    {touched ? error : "" }
                </div>
            </div>
        );
    }

    getComponentForField(field) {
        console.log("getComponentForField " , field.fieldConfig.fieldName);

        const { fieldConfig, } = field;
        const { title, size, description, category, image } = FIELDS;

        switch (fieldConfig.fieldName){
            case title.fieldName:
            case size.fieldName:
            case description.fieldName:
            case category.fieldName:
            // case image.fieldName:
                console.log("getComponentForField FIELDS.category.fieldName");
                return this.renderField(field);
        }

    }

    submit(values) {
        const formID = values.title;
        console.log('\n\n\n\nSAVING FORM!!!\n\n\n\n\n\n\n\n\n\n\n\n\n', formID);
        //addImageToForm
        values["image"] = this.props.imgFile;
        this.props.saveForm(values, formID);
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <form onSubmit={ handleSubmit(this.submit) }>
                                {
                                    _.map(FIELDS, (fieldConfig, field) => {
                                        return ( <Field
                                            key={ field }
                                            name={ field }
                                            label={ fieldConfig.label }
                                            fieldConfig={ fieldConfig }
                                            component={ this.getComponentForField }
                                        />)
                                    })
                                }
                                <div>
                                    <img src={ this.props.imgFile.preview } key={this.props.imgFile.name}/>
                                </div>
                                <div>
                                    <Button id="saveb" type="submit" bsStyle="primary" bsSize="lg" active>Save</Button>
                                </div>
                            </form>
                        </Panel>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function validate(values) {
    console.log("in validate!!", values);
    const errors = {};

    // inputType: value, field: key
    _.each(FIELDS, (config, field) => {
        if(!values[field]) {
            errors[field] = `Enter a ${field}`;
        }
    });

    /* if errors is empty, the form is good to submit
     *if errors has *any* properties, redux form assumes form is invalid*/
    return errors;
}

function mapStateToProps(state){
    return {
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ saveForm }, dispatch);
}

PaintingForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PaintingForm);

export default reduxForm({
    validate,
    // form: 'PaintingForm',
    fields: _.keys(FIELDS),
})(PaintingForm);

