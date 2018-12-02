import React, {Component} from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
// this could be a fuctional componenent as Modal (in which this is wrapped) is taling care of unnecessary updates of OS
    componentWillUpdate() {
       // console.log("OS component will update");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map( igKey => {
                return (
                <li key={igKey}>
                    <span style={{testTransform: 'capitalize'}}>
                        {igKey}
                    </span> : {this.props.ingredients[igKey]}
                </li>
                )
            });
    return (
        <Aux>
            <h3> Your Order</h3>
            <p> A delicious Burger with following ingredients: </p>
            <ul> {ingredientSummary} </ul>
            <p><strong>Total Price: {this.props.totalPrice.toFixed(2)} </strong></p>
            <p> Continue to Checkout</p>
            <Button clicked={this.props.purchaseCancelled} buttonType="Danger">CANCEL</Button>
            <Button clicked={this.props.purchaseContinued} buttonType="Success">CONTINUE</Button>
        </Aux>
        );

    }
}
export default OrderSummary;