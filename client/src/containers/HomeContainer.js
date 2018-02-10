/**
 * Created by amirassad on 9/26/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dispatchGetPaintings } from "../actions/paintingActions";
import Home from '../components/pages/Home';

class HomeContainer extends React.Component {
    static propTypes = {
        paintings: PropTypes.array.isRequired,
        dispatchGetPaintings: PropTypes.func.isRequired,
    };

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
        paintings: state.paintingReducer.paintings,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ dispatchGetPaintings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
