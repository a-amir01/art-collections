/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Col, Row, Well, Panel, Button } from 'react-bootstrap';

import 'react-widgets/dist/css/react-widgets.css';

export function renderField(field) {

    const { meta: { touched, error }, fieldConfig, label, input, type  } = field;

    const className = `form-group ${ touched && error ? 'has-danger': '' }`;

    return (

        <div className={className}>
            <label>
                { label }
            </label>

            <div>
                <fieldConfig.inputType className="form-control" { ...input } placeholder={ label } />

                { touched &&
                (error &&
                    <span className="text-help">
                        {error}
                    </span>
                )
                }
            </div>
        </div>
    );
}

class GenericForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, imgFile, submitButtonName, fields,
                componentForField, pristine, reset, submitting, submitForm } = this.props;

        return (

            <Panel>
                <form onSubmit={ handleSubmit(data => submitForm(data)) }>
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
                    {
                        imgFile &&
                        <div>
                            <img src={ imgFile.preview } key={ imgFile.name }/>
                        </div>
                    }
                    <div id="paintingFormButton">
                        <Button
                            id="saveb"
                            type="submit"
                            bsSize="lg"
                            disabled={ submitting }
                            bsStyle="primary">
                            { submitButtonName }
                        </Button>
                        <Button type="button" bsSize="lg" bsStyle="warning" disabled={ pristine || submitting } onClick={reset}>
                            Clear Values
                        </Button>

                        {/*<Button id="saveb" type="submit" bsStyle="primary" bsSize="lg" active>{ submitButtonName }</Button>*/}
                    </div>
                </form>
            </Panel>

        )
    }
}

export default reduxForm({
    // https://redux-form.com/7.2.3/docs/api/reduxform.md/#-getformstate-function-optional-
})(GenericForm);


