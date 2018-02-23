/**
 * Created by amirassad on 9/24/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react'

import CategoryItem from '../../../components/pages/category/CategoryItem';

function generateCategories(categories, deleteCategory) {
    return (
        categories.map(({ category, _id }) => {
            return(
            <List.Item key= { _id }>
                <List.Content floated='right'>
                    <Button color="red" onClick={ () => { deleteCategory(_id) }  }>Delete</Button>
                </List.Content>
                <List.Content>
                    <CategoryItem
                        key= { _id }
                        label={ category }
                    />
                </List.Content>
            </List.Item>)
        })
    );
}
//style={{  overflow: "hidden", overflowY:"scroll", height: "200px" }}
export default function CategoryList({ categories, deleteCategory }) {
    return (
        <List divided verticalAlign='middle' style={{  overflowY:"auto", whiteSpace: "nowrap", height: "200px" }} >
            { generateCategories(categories, deleteCategory) }
        </List>
    );
}

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    deleteCategory: PropTypes.func.isRequired,
};
