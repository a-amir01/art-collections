/**
 * Created by amirassad on 9/24/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function CategoryItem({ label, _id, deleteCategory }) {
    return (
        <li className="list-group-item">
            { label }
            <Button id="delete-category" bsSize="small" bsStyle="danger" onClick={ () => { deleteCategory(_id) }  }>Delete</Button>
        </li>
    );
}

CategoryItem.propTypes = {
    _id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    deleteCategory: PropTypes.func.isRequired,
};

