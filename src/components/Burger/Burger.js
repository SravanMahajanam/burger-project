import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredients';
import classes from './Burger.css';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map( igKey => {
            return [...Array(props.ingredients[igKey])].map((_, igIndex)=> {
                return <BurgerIngredient key={igKey + igIndex} type={igKey} />;
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding Ingredients</p>;
        } 
        return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;