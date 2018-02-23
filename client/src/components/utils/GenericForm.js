/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

import { Container, Button, Form, Message } from 'semantic-ui-react'
import 'react-widgets/dist/css/react-widgets.css';

export function renderField(field) {
    //error's value is from validate(field)
    const { meta: { touched, error }, fieldConfig, label, input, type  } = field;

    return (
        <div >
            <label>
                { label }
            </label>

            <div>
                <Form.Field { ...input }
                            control={ fieldConfig.inputType }
                            type={ type }
                            placeholder={ label }
                            error={ error && touched }/>
                {/*{ touched && error && (*/}
                    {/*<Message*/}
                        {/*error={ true }*/}
                        {/*header={ error }>*/}
                    {/*</Message>*/}
                    {/*)*/}
                {/*}*/}
            </div>
        </div>
    );
}

class GenericForm extends React.Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        submitButtonName: PropTypes.string.isRequired,
        componentForField: PropTypes.func.isRequired,
        submitForm: PropTypes.func.isRequired,
        initialValues: PropTypes.object,
    };

    constructor(props, context){
        super(props, context);

        this.uploadingForm = this.uploadingForm.bind(this);
        this.state = {
            submitting: false,
        };
    }

    componentDidMount() {
        const { initialize, initialValues } = this.props;
        if(initialValues) {
            initialize(initialValues);
        }
    }

    uploadingForm(isUploading) {
        this.setState({ submitting: isUploading });
    }

    render() {
        const { handleSubmit, submitButtonName, fields,
                componentForField, pristine, reset, submitForm } = this.props;
        const { state, uploadingForm } = this;

        return (
            <Container style={{ background: "transparent", padding: "10px 20px", margin: "10px auto", borderRadius: "8px", fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>
                <Form loading={ state.submitting } error onSubmit={
                    handleSubmit(async data => {
                        uploadingForm(true);
                        await submitForm(data);
                        uploadingForm(false);
                        reset();
                        })}>
                    {
                        _.map(fields, (fieldConfig, field) => {
                            return ( <Field
                                key={ field }
                                name={ field }
                                label={ fieldConfig.label }
                                type={fieldConfig.type }
                                fieldConfig={ fieldConfig }
                                component={ componentForField }
                                validate={ fieldConfig.validate }
                            />)
                        })
                    }
                    <Button.Group attached style={{ paddingTop: "10px" }}>
                        <Button color="yellow" disabled={ pristine || state.submitting } onClick={ reset }>
                            Clear
                        </Button>
                        <Button color="blue"
                                     type="submit"
                                     primary
                                     disabled={ pristine || state.submitting }>
                            { submitButtonName }
                        </Button>
                        {/*<Button*/}
                            {/*id="saveb"*/}
                            {/*type="submit"*/}
                            {/*color="blue"*/}
                            {/*disabled={ pristine || submitting }>*/}
                            {/*{ submitButtonName }*/}
                        {/*</Button>*/}

                    </Button.Group>
                </Form>
            </Container>
        );
    }
}

export default reduxForm({
    // https://redux-form.com/7.2.3/docs/api/reduxform.md/#-getformstate-function-optional-
})(GenericForm);


