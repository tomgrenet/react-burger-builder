//BurgerBuilder.js

import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

//Defining global constant
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum,el) => {
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});  
    }

    addIngredientHandler = (type) => {
        const  updatedCount = this.state.ingredients[type] + 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        //if negative or nil then function returns nothing 
        if (oldCount <= 0) {return;}

        const  updatedCount = oldCount - 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    //Arrow syntax again to make sure this refers to the class
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('To be continued; need server connection');
    }

    render () {
        // Code for disabling button if quantity = 0
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            //disabledInfo[key] <=0 returns true or false
            disabledInfo[key] = disabledInfo[key] <=0
        }
    
        return ( 
            <Auxiliary>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}   
                    purchasable={this.state.purchasable} 
                    ordered={this.purchaseHandler}  
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;