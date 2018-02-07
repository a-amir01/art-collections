/**
 * Created by amirassad on 2/6/18.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PaintingDropZone  from '../../components/pages/painting/PaintingDropZone';
import { addForms } from '../../actions/paintingFormActions';

class PaintingDropZoneContainer extends React.Component {
    render() {
        const { addForms, currentForms } = this.props;
        return (
            <PaintingDropZone
                addForms={ addForms }
                currentForms={ currentForms }
            />
        )
    }
}

function mapStateToProps(state){
    return {
        currentForms: state.paintingFormReducer.currentForms,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addForms }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingDropZoneContainer);
