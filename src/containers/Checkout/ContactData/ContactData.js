import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementtype: 'input',
                elementConfig: {
                    elementtype: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementtype: 'input',
                elementConfig: {
                    elementtype: 'email',
                    placeholder: 'Your E-mail'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementtype: 'input',
                elementConfig: {
                    elementtype: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementtype: 'input',
                elementConfig: {
                    elementtype: 'text',
                    placeholder: 'ZIP code'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementtype: 'select',
                elementConfig: {
                    options : [{value: 'fastest', displayValue: 'Fastest'}, //displayValue
                                {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value:'',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if(isValid && rules.required) {
            isValid = value.trim() !== '';    
        }
        if(isValid && rules.minLength) {
            isValid = value.length >= rules.minLength;
        }

        if(isValid && rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }
        
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updateOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updateOrderForm) {
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementArray = [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementArray.map( formElement => (
                        <Input key={formElement.id} elementtype={formElement.config.elementtype}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value} 
                                changed={ (event) => this.inputChangedHandler(event, formElement.id)}
                                inValid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation} 
                                touched={formElement.config.touched} />
                    ))}
                    <Button buttonType="Success" disabled={!this.state.formIsValid}> ORDER </Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h3> Enter your contact Data</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);