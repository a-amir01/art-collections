/**
 * Created by amirassad on 9/26/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPaintings } from "../actions/paintingActions";
import Home from '../components/pages/Home';

class HomeContainer extends React.Component {

    render () {
        const { paintings } = this.props;
        return (
                <Home
                    paintings={ paintings }
                />
            );
    }
}

function mapStateToProps(state){
    return {
        paintings: state.paintingReducers.paintings,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPaintings}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
