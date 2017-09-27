/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';

import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

function generateGalleryMenu(categories) {
    const INCREMENT = 0.1;
    let item = 2;

    //get all categories
    return categories.map(({ category }) => {
        item += INCREMENT;
        const eveKey = parseFloat(item).toFixed(1);
        const path = "/gallery/" + category;
        console.log("PaintingList: Generating category\n", eveKey, category);

        return (
            <MenuItem
                key={ category }
                eventKey={ eveKey }
                href={ path }>
                { category }
            </MenuItem>
        )
    });

}

export default function Navigation({ categories }) {
    // onSelect={this.handleSelect}
    console.log("Render in Navigation.js");
    return(
        <Nav bsStyle="tabs" activeKey="1" >
            <NavItem eventKey="1" href="/">Home</NavItem>
            <NavDropdown eventKey="2" title="Gallery" id="nav-dropdown">
                { generateGalleryMenu(categories) }
            </NavDropdown>
            <NavItem eventKey="3" href="/biography/" title="/biography">Biography</NavItem>
            <NavItem eventKey="4" href="/orders">Orders</NavItem>
            <NavItem eventKey="5" href="/lessons">Lessons</NavItem>
            <NavItem eventKey="6" href="/exhibitions">Exhibitions</NavItem>
            <NavItem eventKey="7" href="/admin">Admin</NavItem>
            <NavItem eventKey="8" href="/category">Category</NavItem>
        </Nav>
    );

}


