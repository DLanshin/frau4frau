import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";

const Radio = observer((props) => {
    const {
        item,
        required,
        name,
        type,
        value,
        onChange
    } = props

    return (
        <div className={"radio-group"}>
            <label>
                <input
                    required={required}
                    type={type}
                    // checked={value}
                    name={name}
                    value={value}
                    onChange={()=>onChange(item)}
                />
                <span>{item.name}</span>
            </label>
        </div>
    );
});

export default Radio;