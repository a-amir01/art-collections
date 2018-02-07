/**
 * Created by amirassad on 9/24/17.
 */

import React from 'react';
import { Button } from 'react-bootstrap';

export default function CategoryItem ({ label, _id, click }) {
    return (
        <li className="list-group-item">
            { label }
            <Button id="delete-category" bsSize="small" bsStyle="danger" onClick={ () => { click(_id) }  }>Delete</Button>
        </li>
    );
}