import React from 'react';
import MenuList from '../components/menu/MenuList';

const Menu = () => {
    return (
        <div className="page menu-page">
            <div className="container">
                <h1>Our Menu</h1>
                <p className="subheading">Explore our fresh and delicious options</p>
                <MenuList />
            </div>
        </div>
    );
};

export default Menu;