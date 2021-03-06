import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            count: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map( ingredient => {
        return <span 
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        border:'1px  solid #ccc',
                        margin: '0 8px',
                        padding: '5px'
                    }} 
    key={ingredient.name}> {ingredient.name} ({ingredient.count})</span>;
    });

    return (
        <div className={classes.Order}>
            <p> Ingredients : {ingredientsOutput}</p>
            <p> Price : <strong>INR {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;