/**
 * Created by amirassad on 9/23/17.
 */

import React from 'react';

import { MenuItem, InputGroup, DropdownButton,
    Image, Col, Row, Well, Panel, FormControl,
    FormGroup, ControlLabel, Button} from 'react-bootstrap';

import GenericForm, { renderField } from '../../utils/GenericForm';
import CategoryListContainer from '../../../containers/category/CategoryListContainer';


function validate(value) {
    console.log("in validate!!", value);
    return value ? undefined : 'Required';
}

const FIELDS = {
    category: {
        fieldName: "category",
        label: "category",
        inputType: "input",
        type: "",
        validate: validate,
    }
};

class CategoryForm extends React.Component {

    constructor(props) {
        super(props);
        this.getComponentForField = this.getComponentForField.bind(this);
        this.submit = this.submit.bind(this);
    }

    getComponentForField(field) {
        console.log("getComponentForField " , field.fieldConfig.fieldName);

        const { fieldConfig, } = field;
        const { category } = FIELDS;

        switch (fieldConfig.fieldName){
            case category.fieldName:
                console.log("getComponentForField FIELDS.category.fieldName");
                return renderField(field);
        }
    }

    submit(values) {
        console.log("VALUES: ", values);
        values.category = values.category.replace(/ /g, "");
        this.props.onSave(values);

        //addImageToForm
        //"./uploads is from root of eli-collections/upload
    }

    render() {
        const { form } = this.props;
        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <GenericForm
                            form={ form }
                            onSubmit={ this.submit }
                            componentForField={ this.getComponentForField }
                            fields={ FIELDS }
                            submitButtonName="Save"
                        />
                    </Col>
                    <Col xs={12} sm={6}>
                        <CategoryListContainer/>
                    </Col>
                </Row>

            </Well>
        );
    }
}

export default CategoryForm;