/**
 * Created by amirassad on 7/18/17.
 */

// https://redux-form.com/7.0.1/examples/

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone';
import axios from 'axios';
import _ from 'lodash';

import { MenuItem, InputGroup, DropdownButton,
        Image, Col, Row, Well, Panel, FormControl,
        FormGroup, ControlLabel, Button} from 'react-bootstrap';

import { bindActionCreators } from 'redux';

import { getPaintings, postPainting, resetButton } from '../../actions/paintingActions';
import PaintingDropZone from "./PaintingDropZone";

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
    image: {
        fieldName: "image",
        label: "Image",
        inputType: "img",
        type: "",
    }
};


const FILES = [];

class PaintingForm extends React.Component {

    constructor(props) {
        super(props);
        this.getComponentForField = this.getComponentForField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.dropZoneData = this.dropZoneData(this);
        // this.renderDropZone = this.renderDropZone.bind(this);
        // this.onDrop = this.onDrop.bind(this);
        this.state = {
            images: [],
            img: '',
            category: '',
        };
    }

    dropZoneData(file) {
        this.setState({ images: this.state.images.concat(file)});
        FILES.push(file);
        console.log("from dropZone", FILES);
        console.log("from dropZone", file);
        console.log("Sate in dropZoneData ", this.state);

    }

    // componentDidMount() {
    //
    // }

    // componentDidUpdate() {
    //
    // }

    renderField(field) {
        console.log("IN renderField ", field.input);

        if(field.input.name === "image"){
            return ( <img src={ this.props.imgFile.preview } key={this.props.imgFile.name}/> )
        }
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
        )
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
            case image.fieldName:
                console.log("getComponentForField FIELDS.category.fieldName");
                return this.renderField(field);

        }

    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render(){
        const { handleSubmit } = this.props;

        // const imgList = this.state.images.map((img, i) => {
        //     const pic = "/images/" + img.name;
        //     return (
        //         <MenuItem className="img" key={i} eventKey={ img.name } onClick={ this.handleImgSelect(img.name) }>
        //             <div style={{ position: "relative" }}>
        //                 <img src={pic}/>
        //                 <div style={{paddingTop: "5px"}}>{imgArr.name}</div>
        //             </div>
        //         </MenuItem>
        //     )
        // });

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <form onSubmit={ handleSubmit(this.onSubmit) }>
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
                            </form>

                            {/*<PaintingDropZone*/}
                                {/*DropZone={ this.dropZoneData.bind(this) }*/}
                            {/*/>*/}
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

    //inputType: value, field: key
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
    return bindActionCreators({ getPaintings }, dispatch);
}

PaintingForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PaintingForm);

export default reduxForm({
    validate,
    form: 'PaintingForm',
    fields: _.keys(FIELDS),
})(PaintingForm);

