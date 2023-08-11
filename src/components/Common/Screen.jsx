import React from 'react';
const Screen = ({className, children}) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default Screen;