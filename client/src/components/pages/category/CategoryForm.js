/**
 * Created by amirassad on 9/23/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Well } from 'react-bootstrap';

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
    static propTypes = {
        form: PropTypes.string.isRequired,
        dispatchAddCategory: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.getComponentForField = this.getComponentForField.bind(this);
        this.submit = this.submit.bind(this);
    }

    getComponentForField(field) {
        const { fieldConfig, } = field;
        const { category } = FIELDS;

        switch (fieldConfig.fieldName){
            case category.fieldName:
                return renderField(field);
        }
    }

    submit(values) {
        const { dispatchAddCategory } = this.props;
        values.category = values.category.replace(/ /g, "");
        dispatchAddCategory(values);

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
                            submitForm={ this.submit }
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