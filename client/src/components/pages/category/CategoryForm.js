/**
 * Created by amirassad on 9/23/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Container, Grid } from 'semantic-ui-react'

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
        type: "text",
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

    async submit(values) {
        const { dispatchAddCategory } = this.props;
        values.category = values.category.replace(/ /g, "");
        await dispatchAddCategory(values);

        //addImageToForm
        //"./uploads is from root of eli-collections/upload
    }

    render() {
        const { form } = this.props;
        return (
            <Container >
                <Grid padded divided columns={1}>

                    <Grid.Row style={{ background: "#f4f7f8", padding: "10px 20px", margin: "10px auto", borderRadius: "8px" }}>
                        <Grid.Column>
                            <GenericForm
                                form={ form }
                                submitForm={ this.submit }
                                componentForField={ this.getComponentForField }
                                fields={ FIELDS }
                                submitButtonName="Save"
                            />
                        </Grid.Column>

                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <CategoryListContainer/>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default CategoryForm;