/**
 * Created by amirassad on 2/6/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PaintingDropZone  from '../../components/pages/painting/PaintingDropZone';
import { dispatchNewForms } from '../../actions/paintingFormActions';

class PaintingDropZoneContainer extends React.Component {
    static propTypes = {
        currentForms: PropTypes.array.isRequired,
        dispatchNewForms: PropTypes.func.isRequired,
    };

    render() {
        const { dispatchNewForms, currentForms } = this.props;
        return (
            <PaintingDropZone
                dispatchNewForms={ dispatchNewForms }
                currentForms={ currentForms }
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        currentForms: state.paintingFormReducer.currentForms,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ dispatchNewForms }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingDropZoneContainer);
