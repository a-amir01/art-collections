/**
 * Created by amirassad on 9/24/17.
 */

import React from 'react';
import { ListGroup } from 'react-bootstrap';

import CategoryItemContainer from '../../../containers/category/CategoryItemContainer';

function generateCategories(categories) {
    return (
        categories.map(({ category, _id }) => {
            return <CategoryItemContainer
                key= { _id }
                label={ category }
                _id={ _id }
            />
        })
    );
}

export default function CategoryList({ categories }) {
    return (
        //<h1>CategoryList</h1>
        <ListGroup componentClass="ul">
            { generateCategories(categories) }
        </ListGroup>
    );

}
