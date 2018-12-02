import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigtionItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolBar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle drawerToggleClicked={props.opened}></DrawerToggle>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}><NavigationItems /></nav>
    </header>
);

export default toolBar;