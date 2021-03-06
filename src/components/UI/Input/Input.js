import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClassName = [classes.InputElement];
    if(props.inValid && props.shouldValidate && props.touched) {
        inputClassName.push(classes.Invalid);
    }

    switch(props.elementtype) {
        case('input'):
            inputElement = <input className={inputClassName.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case( 'textarea'):
            inputElement = <textarea className={inputClassName.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case( 'select'):
            inputElement = (
                <select className={inputClassName.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map( option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{Response.label}</label>
            {inputElement}
        </div>
    );
}

export default input;