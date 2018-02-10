/**
 * Created by amirassad on 9/26/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dispatchAddCategory } from '../../actions/categoryActions';
import CategoryForm from '../../components/pages/category/CategoryForm';

class CategoryFormContainer extends React.Component {
    static propTypes = {
        dispatchAddCategory: PropTypes.func.isRequired,
    };

    render() {
        const { dispatchAddCategory } = this.props;
        return (
            <CategoryForm
                dispatchAddCategory={ dispatchAddCategory }
                form="CategoryForm"
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ dispatchAddCategory }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategoryFormContainer);


