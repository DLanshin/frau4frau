import React from "react";

const TextArea = ({ label, className, autoComplete, name, min, required, type, placeholder, value, onChange}) => {
    return (
        <div className={"input-container"}>
            {label ? <label>{label}</label> : ""}
            <textarea
                name={name}
                required={required}
                className={`textarea ${className}`}
                placeholder={placeholder}
                value={value}
                autoComplete={autoComplete}
                onChange={(e)=>onChange(e.target.value)}
            >{value}</textarea>
        </div>
    );
};

export default TextArea;