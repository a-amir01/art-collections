/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { saveForm } from '../../actions/paintingFormActions';
import PaintingFormList from '../../components/pages/painting/PaintingFormList';

class PaintingFormListContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { categories, newForms, saveForm } = this.props;

        return (
            <PaintingFormList
                images={ newForms }
                categories={ categories }
                saveForm={ saveForm }
            />
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ saveForm }, dispatch);
}

function mapStateToProps(state){
    return {
        newForms: state.paintingFormReducer.currentForms,
        categories: state.categoryReducer.categories,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingFormListContainer);
