import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink exact
            to={props.link} 
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;

// Note: check out the lectrure 220 to understand why we need activeClassName above, this is something to do with css modules not relaeed to React