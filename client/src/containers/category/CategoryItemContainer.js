/**
 * Created by amirassad on 9/25/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryItem from '../../components/pages/category/CategoryItem';
import { removeCategory } from '../../actions/categoryActions';

class CategoryItemContainer extends React.Component {

    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    deleteCategory() {
        const { _id } = this.props;
        this.props.removeCategory(_id);
    }

    render() {
        const { label } = this.props;
        return (
            <CategoryItem
                label={ label }
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItemContainer);
