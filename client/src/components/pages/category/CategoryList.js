/**
 * Created by amirassad on 9/24/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import CategoryItem from '../../../components/pages/category/CategoryItem';

function generateCategories(categories, deleteCategory) {
    return (
        categories.map(({ category, _id }) => {
            return <CategoryItem
                key= { _id }
                label={ category }
                _id={ _id }
                deleteCategory={ deleteCategory }
            />
        })
    );
}

export default function CategoryList({ categories, deleteCategory }) {
    return (
        //<h1>CategoryList</h1>
        <ListGroup componentClass="ul">
            { generateCategories(categories, deleteCategory) }
        </ListGroup>
    );

}

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    deleteCategory: PropTypes.func.isRequired,
};
