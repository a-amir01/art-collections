/**
 * Created by amirassad on 7/18/17.
 */

// https://redux-form.com/7.0.1/examples/

import React from 'react';
import axios from 'axios';
import { MenuItem, InputGroup, DropDownButton,
         Image, Col, Row, Well, Panel, FormControl,
         FormGroup, ControlLabel, Button} from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { getPaintings, postPainting, resetButton } from '../../actions/paintingActions';

class PaintingForm extends React.Component {
    render(){
        return (
            <h1>Painting Form</h1>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingForm);
