import React from "react";

const Input = ({ label, className, autoComplete, name, min, required, type, placeholder, value, onChange}) => {
    return (
        <div className={"input-container"}>
            {label ? <label>{label}</label> : ""}
            <input
                name={name}
                required={required}
                className={`input ${className}`}
                type={type}
                min={min}
                placeholder={placeholder}
                value={value}
                autoComplete={autoComplete}
                onChange={(e)=>onChange(e.target.value)}
            />
        </div>
    );
};

export default Input;