/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllCategories } from '../../actions/categoryActions';

import CategoryList from '../../components/pages/category/CategoryList';

class CategoryListContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { categories } = this.props;

        return (
            <CategoryList
                categories={ categories }
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categoryReducer.categories,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);

