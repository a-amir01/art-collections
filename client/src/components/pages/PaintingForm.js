/**
 * Created by amirassad on 7/18/17.
 */

/* https://redux-form.com/7.0.1/examples/
 * how to have multiple forms in one page
 * https://stackoverflow.com/questions/37456526/how-to-embed-the-same-redux-form-multiple-times-on-a-page/37464048#37464048
 */

import React from 'react';
import axios from 'axios';
import request from 'superagent';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import _ from 'lodash';

import { MenuItem, InputGroup, DropdownButton,
        Image, Col, Row, Well, Panel, FormControl,
        FormGroup, ControlLabel, Button} from 'react-bootstrap';

import DropdownList from 'react-widgets/lib/DropdownList'

import { bindActionCreators } from 'redux';
import { saveForm } from '../../actions/paintingFormActions';
import { getAllCategories } from '../../actions/categoryActions';
import 'react-widgets/dist/css/react-widgets.css';


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

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

class PaintingForm extends React.Component {

    constructor(props) {
        super(props);
        this.getComponentForField = this.getComponentForField.bind(this);
        this.renderField = this.renderField.bind(this);
        this.renderMultiselect = this.renderMultiselect.bind(this);
        this.submit = this.submit.bind(this);
        this.writeFileToDisk = this.writeFileToDisk.bind(this);
        this.state = {
            imgWritten: false,
        };
    }

    componentDidMount() {
        this.props.getAllCategories();
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

    renderMultiselect(field) {
        const { input } = field;
        const { meta: { touched, error }, fieldConfig  } = field;
        const className = `form-group ${touched && error ? 'has-danger': ''}`;
        console.log("CATEGORIES:\n" , this.props.categories);
        const categoryLabels = this.props.categories.map(({ category }) => {
            return category
        });
        console.log("CATEGORIES:\n" , categoryLabels);


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
                <div className="text-help">
                    {touched ? error : "" }
                </div>
            </div>
        )
    }

    // renderCategories(field) {
    //     return (
    //         <div>
    //             <option value="">Select a color...</option>
    //             {
    //                 colors.map(colorOption => {
    //                     return (
    //                         <option value={colorOption} key={colorOption}>
    //                         {colorOption}
    //                         </option>
    //                     )}
    //                 )
    //             }
    //         </div>
    //     )
    // }

    getComponentForField(field) {
        console.log("getComponentForField " , field.fieldConfig.fieldName);

        const { fieldConfig, } = field;
        const { title, size, description, category, image } = FIELDS;

        switch (fieldConfig.fieldName){
            case title.fieldName:
            case size.fieldName:
            case description.fieldName:
                return this.renderField(field);
            case category.fieldName:
                return this.renderMultiselect(field);
            // case image.fieldName:
                console.log("getComponentForField FIELDS.category.fieldName");

        }

    }

    submit(values) {
        console.log("VALUES: ", values);
        const formID = values.title;
        //addImageToForm
        //"./uploads is from root of eli-collections/upload

        if(!this.state.imgWritten) {
            values["image"] = "/uploads/" + _.replace(this.props.imgFile.name, / /g, '');
            this.writeFileToDisk(this.props.imgFile);
            this.setState({imgWritten: true});
        }
        this.props.saveForm(values, formID);
    }

    writeFileToDisk(file){
        let formDataImg = new FormData();
        console.log(file);
        formDataImg.append('file', file);

        let req = request
            .post('/api/file')
            .send(formDataImg);

        req.end(function(err,response){
            if (err) {
                console.log(err);
            }
           console.log("upload done!!!!!");
        });
        // axios.post("/api/file", formDataImg, {'accept': 'application/json', 'Content-Type' : 'multipart/form-data'})
        //     .then((res) => {
        //         alert("success");
        //         console.log('success', res);
        //     })
        //     .catch((err) => {
        //         alert(err);
        //         console.log(err);
        //     });
    }
// <form onSubmit={ (e) => {
//     e.preventDefault();
//     // e.stopPropagation();
//     handleSubmit(this.submit);
// }}>

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
        categories: state.categoryReducer.categories,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ saveForm, getAllCategories}, dispatch);
}

PaintingForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PaintingForm);

export default reduxForm({
    validate,
    // form: 'PaintingForm',
    destroyOnUnmount: false,
    fields: _.keys(FIELDS),
})(PaintingForm);

