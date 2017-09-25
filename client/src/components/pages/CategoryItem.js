/**
 * Created by amirassad on 9/24/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'react-bootstrap';

import { removeCategory } from '../../actions/categoryActions';

class CategoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    deleteCategory() {
        const { _id } = this.props;
        this.props.removeCategory(_id);
    }

    render() {
        return (
            //<h1>CategoryItem</h1>
            <li className="list-group-item">
                { this.props.label }
                <Button id="delete-category" bsSize="small" bsStyle="danger" onClick={this.deleteCategory}>Delete</Button>
            </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);