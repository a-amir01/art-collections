/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';

import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class navigation extends React.Component {

    handleSelect(eventKey) {
        //event.preventDefault();
        //alert(`selected ${eventKey}`);
    }
    render(){
        console.log("Render in navigation.js");
        return(
            <Nav bsStyle="tabs" activeKey="1" onClick={this.handleSelect.bind(this)}>
                <NavItem eventKey={1} href="/">Home</NavItem>
                <NavDropdown eventKey={2} title="Gallery" id="nav-dropdown">
                    <MenuItem eventKey={2.1} href="/gallery/portraits">Portraits</MenuItem>
                    <MenuItem eventKey={2.2} href="/gallery/abstract-figure">Abstract & Figurative</MenuItem>
                    <MenuItem eventKey={2.3} href="/gallery/canvas-sculpture">Sculpture on Canvas</MenuItem>
                    <MenuItem eventKey={2.4} href="/gallery/persian-heritage">Persian Heritage</MenuItem>
                    <MenuItem eventKey={2.5} href="/gallery/pencil">pencil</MenuItem>
                    <MenuItem eventKey={2.6} href="/gallery/color">color</MenuItem>
                </NavDropdown>
                <NavItem eventKey={3} href="/biography" title="/biography">Biography</NavItem>
                <NavItem eventKey={4} href="/orders">Orders</NavItem>
                <NavItem eventKey={5} href="/lessons">Lessons</NavItem>
                <NavItem eventKey={6} href="/exhibitions">Exhibitions</NavItem>
            </Nav>
        );
    }
}

export default navigation;
