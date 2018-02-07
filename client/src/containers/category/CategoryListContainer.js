/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeCategory } from '../../actions/categoryActions';
import { getAllCategories } from '../../actions/categoryActions';

import CategoryList from '../../components/pages/category/CategoryList';

class CategoryListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    deleteCategory(_id) {
        this.props.removeCategory(_id);
    }

    render() {
        const { categories } = this.props;

        return (
            <CategoryList
                categories={ categories }
                click={ this.deleteCategory }
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
    return bindActionCreators({ removeCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);

