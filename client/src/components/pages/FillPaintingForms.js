/**
 * Created by amirassad on 9/9/17.
 */

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'react-bootstrap';

import PaintingForm from './PaintingForm';
import { submitForms } from '../../actions/formActions';

class FillPaintingForms extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.submitForms(this.props.forms);
    }

    render() {
        const images = this.props.images;
        return (
            <div>
                {/*<h1>FillPaintingForms</h1>*/}
                {
                    images.map(file =>
                    <div key={ file.name }>
                        {/*<img src={ file.preview } key={file.name}/>{file.name}*/}
                        <PaintingForm
                            form={ _.split(file.name, '.')[0] }
                            imgFile={ file }/>
                    </div> )
                }

                <Button bsStyle="primary" bsSize="lg" active onClick={ this.onClick }>Publish</Button>

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        forms: state.paintingFormReducer,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ submitForms }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FillPaintingForms);