/**
 * Created by amirassad on 9/26/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Navigation from '../components/pages/Navigation';
import { dispatchGetCategories } from '../actions/categoryActions';
import { dispatchNewPage } from '../actions/pageActions';

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
        const { categories, currentPage, dispatchNewPage } = this.props;
        return(
            <Navigation
                categories={ categories }
                currentPage={ currentPage }
                dispatchNewPage={ dispatchNewPage }
            />
        );
    }
}

function mapStateToProps(state){
    return {
        categories: state.categoryReducer.categories,
        currentPage: state.pageReducer.page,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ dispatchGetCategories, dispatchNewPage }, dispatch);

}

//https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(NavigationContainer);

