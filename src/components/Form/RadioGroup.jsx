import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";

const RadioGroup = observer((props) => {
    const {
        listType,
        elements,
        required,
        name,
        type,
        value,
        setValue
    } = props
    if(!elements || !elements?.length){
        return (
            <></>
        );
    }

    return (
        <div className={"radio-group"+(listType === "horizontal" ? " radio-group--horizontal": "")}>
            {
                elements.map((item, key) => (
                    <label key={item.id}>
                        <input
                            required={required}
                            type={type}
                            checked={value?.id === item.id}
                            name={name}
                            value={item}
                            onChange={()=>setValue(item)}
                        />
                        <span>{item.name}</span>
                    </label>
                ))
            }
        </div>
    );
});

export default RadioGroup;