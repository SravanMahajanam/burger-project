import React, { Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {

    state = {
        purchasing: false
    };
    
    componentDidMount () {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
                .map(igKey => ingredients[igKey]) 
                .reduce((arr, element) => arr + element, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.props.price,
        //     customer: {
        //         address: {
        //             street: 'test street',
        //             zip: 12345
        //         },
        //         email: 'test@test.com',
        //     },
        //     deliveryMethod: 'fatest'
        // };

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });

        const queryParams = [];
        queryParams.push('price='+this.props.price);
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) +'='+encodeURIComponent(this.state.ingredients[i]));
        }
        
        const queryString = queryParams.join('&');
        this.props.history.push(
            {pathname:'/checkout',
            search: '?'+queryString
        });
    }

    render () {
        const disableInfo = {
            ...this.props.ings
        };

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger =  this.props.error ? <p> Ingredients can't be loaded !</p>: <Spinner/ >;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls ingredientAdded={this.props.onIngredientsAdded} 
                            ingredientRemoved={this.props.onIngredientsRemoved}
                            disabled={disableInfo} 
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings} 
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                totalPrice={this.props.price}/>;
        }   
        if (this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                {burger}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch(burgerBuilderActions.addIngredients(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));