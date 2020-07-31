//Button.js

import React from 'react';
import classes from './Button.css'

const button = (props) => (
    // We need here:
    // - Cancel or Continue or any other text put inside the button --> props.children
    // - Different styling depending on the button
    <button
        // Adding the Button class then conditionally either Danger or Success
        // Need a string so we join the array
        className = {[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;