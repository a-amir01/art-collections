/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PaintingFormList from '../../components/pages/painting/PaintingFormList';
import { submitForms } from '../../actions/paintingFormActions';

class PaintingFormListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }

    save() {
        console.log("FORMS\n", this.props.form);
        this.props.submitForms(this.props.forms);
    }

    render() {
        const images = this.props.images;

        return (
            <PaintingFormList
                images={ images }
                click={ this.save }
            />
        );
    }
}

function mapStateToProps(state){
    console.log("STATE\n", state);
    return {
        forms: state.paintingFormReducer,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ submitForms }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingFormListContainer);
