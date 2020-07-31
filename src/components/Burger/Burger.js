//Burger.js

import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    // Transform objects of key-value pair into an array then map() it
    // Object.keys(props.ingredients)) transforms the keys (and only the keys) of the state into an object
    // Then map over all the ingredient keys .map(igKey => {
    //         return [...Array(props.ingredients[igKey])]
    // Then map again to get the length of the key (e.g. there is 2 bacon slice)
    // .map((_, i) => {
    //     return <BurgerIngredient

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key = {igKey + i} type={igKey} />;
            });
        })
        // This will reduce the transformedIngredients array to a single array; 
        // The objective is to check if there is any ingredient in the burger already.
        // And if not send a message to the user prompting to add ingredients.
        .reduce((arr,el) => {
            return arr.concat(el)
        }, []);
        
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients</p>
        }

    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;