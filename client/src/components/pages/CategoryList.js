/**
 * Created by amirassad on 9/24/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllCategories } from '../../actions/categoryActions';

import { ListGroup } from 'react-bootstrap';

import CategoryItem from './CategoryItem';


class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.generateCategories = this.generateCategories.bind(this);
    }

    componentDidMount() {
        this.props.getAllCategories();
    }

    generateCategories() {
        return (
            this.props.categories.map(({ category, _id }) => {
                 return <CategoryItem
                    key= { _id }
                    label={ category }
                    _id={ _id }
                 />

            })
        );
    }

    render() {
        return (
            //<h1>CategoryList</h1>
            <ListGroup componentClass="ul">
                { this.generateCategories() }
            </ListGroup>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categoryReducer.categories,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAllCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
