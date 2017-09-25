/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';

import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllCategories } from '../actions/categoryActions';


const categories = ["Portraits", "Abstract-Figurative", "Sculpture-on-Canvas", "Persian Heritage", "Pencil", "Color", "shit2", "shit3"];

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.generateGalleryMenu = this.generateGalleryMenu.bind(this);
        //this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.props.getAllCategories();
    }

    handleSelect(eventKey) {
        // alert(`selected ${eventKey}`);
    }

    generateGalleryMenu() {
        const INCREMENT = 0.1;
        let item = 2;

        //get all categories
        return this.props.categories.map(({ category }) => {
            item += INCREMENT;
            const eveKey = parseFloat(item).toFixed(1);
            const path = "/gallery/" + category;
            console.log("PaintingList: Generating category\n", eveKey, category);

            return (
                <MenuItem
                    key={ category }
                    eventKey={ eveKey }
                    href={ path }
                >{ category }
                </MenuItem>
            )
        });

    }
    // onSelect={this.handleSelect}
    render(){
        console.log("Render in Navigation.js");
        return(
            <Nav bsStyle="tabs" activeKey="1" >
                <NavItem eventKey="1" href="/">Home</NavItem>
                <NavDropdown eventKey="2" title="Gallery" id="nav-dropdown">
                    { this.generateGalleryMenu() }
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
}

function mapStateToProps(state){
    console.log("Navigation: mapStateToProps\n", state);
    return {
        categories: state.categoryReducer.categories,
    }
}

function mapDispatchToProps(dispatch){
    console.log("Navigation: mapDispatchToProps\n");
    return bindActionCreators({getAllCategories}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

