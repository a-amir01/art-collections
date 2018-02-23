/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {  Menu, Dropdown } from 'semantic-ui-react'

function generateGalleryMenu(categories) {
    return categories.map(({ category }) => {
        const path = "/gallery/" + category;
        return (
            <Dropdown.Item as='a' key={ category } href={ path }>
                { category }
            </Dropdown.Item>
        )
    });
}

//TODO: link to redux Store
export default class Navigation extends React.Component {

    state = { activeItem: '' };

    static propTypes = {
        categories: PropTypes.array.isRequired,
        dispatchNewPage: PropTypes.func.isRequired,
    };


    generateGalleryMenu = (categories) => {
        return categories.map(({ category, _id }) => {
            const path = "/gallery/" + category;
            return (
                <Dropdown.Item key={ _id } name={ category } onClick={this.handleItemClick}>
                    <NavLink exact to={ path } style={{ padding: '5px', display: 'block', color: 'black' }} activeStyle={{ fontWeight: 'bold', color: 'green' }}>
                        { category }
                    </NavLink>
                </Dropdown.Item>
            )
        });
    };

    handleItemClick = (e, { name }) => {  this.setState({ activeItem: name }); /*this.props.dispatchNewPage(name);*/ };
    //onClick={this.handleItemClick}
    render() {
        // alert(window.location.href);
        const { categories, currentPage } = this.props;
        const { activeItem } = this.state;
        return (
            <Menu stackable>
                <Menu.Item as='div' name="home" active={ activeItem === 'home' } onClick={this.handleItemClick}>
                    <NavLink exact to="/" style={{ padding: '5px', display: 'block', color: 'black'}} activeStyle={{ fontWeight: 'bold', color: 'green' }}>
                        Home
                    </NavLink>
                </Menu.Item>
                <Dropdown item text='Gallery'>
                    <Dropdown.Menu>
                        { this.generateGalleryMenu(categories) }
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item as='div' name="admin" active={activeItem === 'admin'} onClick={this.handleItemClick}>
                    <NavLink exact to="/admin" style={{ padding: '5px', display: 'block', color: 'black'}} activeStyle={{ fontWeight: 'bold', color: 'green' }}>
                        Admin
                    </NavLink>
                </Menu.Item>
                <Menu.Item as='div' name="category" active={ activeItem === 'category' } onClick={this.handleItemClick}>
                    <NavLink to="/category"  style={{ padding: '5px', display: 'block', color: 'black'}} activeStyle={{ fontWeight: 'bold', color: 'green' }}>
                        Category
                    </NavLink>
                </Menu.Item>
            </Menu>
        );
    }

}

