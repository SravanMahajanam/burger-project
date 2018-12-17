import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state ={
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount () {
        let ingredients = {};
        const query = new URLSearchParams(this.props.location.search);
        let totalPrice = 0;
        for(let param of query.entries()) {
            // ['salad',2]
            if(param[0] === 'price') {
                totalPrice = param[1];
            }
            else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients, totalPrice: totalPrice});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients}/>
                <Route path={this.props.match.url + "/contact-data"} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} />
            </div>
        );
    }
}

export default Checkout;