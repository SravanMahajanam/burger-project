import React, { Component } from 'react';

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
                value:''
            },
            email: {
                elementtype: 'input',
                elementConfig: {
                    elementtype: 'email',
                    placeholder: 'Your E-mail'
                },
                value:''
            },
            street: {
                elementtype: 'input',
                elementConfig: {
                    elementtype: 'text',
                    placeholder: 'Street'
                },
                value:''
            },
            postalCode: {
                elementtype: 'input',
                elementConfig: {
                    elementtype: 'text',
                    placeholder: 'ZIP code'
                },
                value:''
            },
            deliveryMethod: {
                elementtype: 'select',
                elementConfig: {
                    options : [{value: 'fastest', displayValue: 'Fastest'}, //displayValue
                                {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value:''
            }
        },
        testst: {
            a:{
                name:'a'
            }
        }
        
    }

    orderHandler = (event) => {
        console.log(this.state.orderForm);
        event.preventDefault();
        this.setState({loading: true})
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            console.log(formElementIdentifier);
            console.log('in for:'+this.state.orderForm.formElementIdentifier);
            formData[formElementIdentifier] = formElementIdentifier.value;
        }
        const order = {
            ingredients: this.props.ingredients,
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
        updateOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updateOrderForm});
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
                                changed={ (event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button buttonType="Success"> ORDER </Button>
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

export default ContactData;