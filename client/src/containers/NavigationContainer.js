/**
 * Created by amirassad on 9/26/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Navigation from '../components/pages/Navigation';
import { getAllCategories } from '../actions/categoryActions';

class NavigationContainer extends React.Component {

    componentDidMount() {
        this.props.getAllCategories();
    }

    render(){
        const { categories } = this.props;
        console.log("Render in Navigation.js");
        return(
            <Navigation
                categories={ categories }
            />
        );
    }
}

function mapStateToProps(state){
    console.log("Navigation: mapStateToProps\n", state);
    return {
        categories: state.categoryReducer.categories,
    }
}

function mapDispatchToProps(dispatch){
    console.log("Navigation: mapDispatchToProps\n");
    return bindActionCreators({ getAllCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);

