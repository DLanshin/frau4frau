import React from 'react';
import Button from "./Button";

const QuantityControl = ({count, decrementAction, incrementAction}) => {
    const decrement = (e) =>{
        e.preventDefault();
        if(typeof decrementAction !== "undefined"){
            decrementAction()
        }
    }
    const increment = (e) => {
        e.preventDefault();
        if(typeof incrementAction !== "undefined") {
            incrementAction()
        }
    }
    return (
        <div className={"quality-control"}>
            <Button onClick={(e)=>{decrement(e)}} className={"quality-control__button"}>-</Button>
            <span className={"quality-control__value"}>{count}</span>
            <Button onClick={(e)=>{increment(e)}} className={"quality-control__button"}>+</Button>
        </div>
    );
};

export default QuantityControl;