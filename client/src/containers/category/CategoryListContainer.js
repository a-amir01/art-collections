/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dispatchRemoveCategory } from '../../actions/categoryActions';

import CategoryList from '../../components/pages/category/CategoryList';

class CategoryListContainer extends React.Component {

    static propTypes = {
        categories: PropTypes.array.isRequired,
        dispatchRemoveCategory: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    deleteCategory(_id) {
        const { dispatchRemoveCategory } = this.props;
        dispatchRemoveCategory(_id);
    }

    render() {
        const { categories } = this.props;

        return (
            <CategoryList
                categories={ categories }
                deleteCategory={ this.deleteCategory }
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
    return bindActionCreators({ dispatchRemoveCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);

