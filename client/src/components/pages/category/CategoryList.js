/**
 * Created by amirassad on 9/24/17.
 */

import React from 'react';
import { ListGroup } from 'react-bootstrap';

import CategoryItem from '../../../components/pages/category/CategoryItem';

function generateCategories(categories, click) {
    return (
        categories.map(({ category, _id }) => {
            return <CategoryItem
                key= { _id }
                label={ category }
                _id={ _id }
                click={ click }
            />
        })
    );
}

export default function CategoryList({ categories, click }) {
    return (
        //<h1>CategoryList</h1>
        <ListGroup componentClass="ul">
            { generateCategories(categories, click) }
        </ListGroup>
    );

}
