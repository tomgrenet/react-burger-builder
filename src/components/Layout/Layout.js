//Layout.js
//We want 2 areas: 
//1st holding the toolbar, sideDrawer and Backdrop
//2nd the main area; we want to ouput the components we wrap with this layout -> props.children 

import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css'

//Below uses hoc to render
const layout = (props) => (
    //Using wrapper hoc Aux as "I want a JSON element" --> Why?
    <Auxiliary>
        <div>Toolbar, sideDrawer, Backdrop</div>
        <main className = {classes.Content}>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;