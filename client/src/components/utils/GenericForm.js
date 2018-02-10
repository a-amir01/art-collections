/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Panel, Button } from 'react-bootstrap';
import _ from 'lodash';

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

    static propTypes = {
        fields: PropTypes.object.isRequired,
        submitButtonName: PropTypes.string.isRequired,
        componentForField: PropTypes.func.isRequired,
        submitForm: PropTypes.func.isRequired,
        initialValues: PropTypes.object,
    };

    componentDidMount() {
        const { initialize, initialValues } = this.props;
        if(initialValues) {
            initialize(initialValues);
        }
    }

    render() {
        const { handleSubmit, submitButtonName, fields,
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
                    <div id="paintingFormButton">
                        <Button
                            id="saveb"
                            type="submit"
                            bsSize="lg"
                            disabled={ pristine || submitting }
                            bsStyle="primary">
                            { submitButtonName }
                        </Button>
                        <Button type="button" bsSize="lg" bsStyle="warning" disabled={ pristine || submitting } onClick={ reset }>
                            Clear
                        </Button>
                    </div>
                </form>
            </Panel>
        );
    }
}

export default reduxForm({
    // https://redux-form.com/7.2.3/docs/api/reduxform.md/#-getformstate-function-optional-
})(GenericForm);


