/**
 * Created by amirassad on 9/23/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

import { MenuItem, InputGroup, DropdownButton,
    Image, Col, Row, Well, Panel, FormControl,
    FormGroup, ControlLabel, Button} from 'react-bootstrap';

import CategoryList from './CategoryList';
import { addCategory } from '../../actions/categoryActions';

const FIELDS = {
    category: {
        fieldName: "category",
        label: "Category",
        inputType: "input",
        type: "",
    }
};

class PaintingCategoryForm extends React.Component {

    constructor(props) {
        super(props);
        this.renderField = this.renderField.bind(this);
        this.getComponentForField = this.getComponentForField.bind(this);
        this.submit = this.submit.bind(this);
    }

    renderField(field) {
        console.log("IN renderField ", field.input);

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
        const { category } = FIELDS;

        switch (fieldConfig.fieldName){
            case category.fieldName:
                console.log("getComponentForField FIELDS.category.fieldName");
                return this.renderField(field);
        }

    }

    submit(values) {
        console.log("VALUES: ", values);
        values.category = values.category.replace(/ /g, "");
        this.props.addCategory(values);

        //addImageToForm
        //"./uploads is from root of eli-collections/upload

    }



    render() {
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
                                        <Button id="saveb" type="submit" bsStyle="primary" bsSize="lg" active>Save</Button>
                                    </div>
                                </form>

                            </Panel>
                        </Col>
                        <Col xs={12} sm={6}>
                            <CategoryList/>
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


function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addCategory }, dispatch);
}

PaintingCategoryForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PaintingCategoryForm);

export default reduxForm({
    validate,
    form: 'PaintingCategoryForm',
    fields: _.keys(FIELDS),
})(PaintingCategoryForm);

