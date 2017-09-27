/**
 * Created by amirassad on 9/26/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCategory } from '../../actions/categoryActions';
import CategoryForm from '../../components/pages/category/CategoryForm';

class CategoryFormContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { addCategory } = this.props;
        return (
            <CategoryForm
                onSave={ addCategory }
                form="CategoryForm"
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addCategory }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategoryFormContainer);


