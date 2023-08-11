import React from "react";

const Select = ({ label, name, required, items, value, onChange}) => {
    return (
        <div className={"select-container"}>
            {label ? <label>{label}</label> : ""}
            <select
                name={name}
                required={required}
                className={"select"}
                onChange={(e)=>onChange(e.target.value)}
                value={value}
            >
                {items.map((i)=>(
                    <option key={i} value={i}>{i}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;