/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dispatchSaveForm } from '../../actions/paintingFormActions';
import PaintingFormList from '../../components/pages/painting/PaintingFormList';

class PaintingFormListContainer extends React.Component {
    static propTypes = {
        categories: PropTypes.array.isRequired,
        currentForms: PropTypes.array.isRequired,
        dispatchSaveForm: PropTypes.func.isRequired,
    };

    render() {
        const { categories, currentForms, dispatchSaveForm } = this.props;

        return (
            <PaintingFormList
                currentForms={ currentForms }
                categories={ categories }
                dispatchSaveForm={ dispatchSaveForm }
            />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ dispatchSaveForm }, dispatch);
}

function mapStateToProps(state) {
    return {
        currentForms: state.paintingFormReducer.currentForms,
        categories: state.categoryReducer.categories,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingFormListContainer);