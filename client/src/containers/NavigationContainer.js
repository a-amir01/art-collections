/**
 * Created by amirassad on 9/26/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Navigation from '../components/pages/Navigation';
import { dispatchGetCategories } from '../actions/categoryActions';

class NavigationContainer extends React.Component {

    static propTypes = {
        dispatchGetCategories: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
    };

    componentDidMount() {
        const { dispatchGetCategories } = this.props;
        dispatchGetCategories();
    }

    render() {
        console.log("Render in Navigation.js");
        const { categories } = this.props;
        return(
            <Navigation
                categories={ categories }
            />
        );
    }
}

function mapStateToProps(state){
    return {
        categories: state.categoryReducer.categories,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ dispatchGetCategories }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);

