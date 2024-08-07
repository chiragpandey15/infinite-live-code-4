import React from 'react';

const ErrorDisplay = ({ error }) => {

    const handleError =(err)=>{
        return err.charAt(0).toUpperCase() + err.slice(1);
    }

    return (
        <div>
            {error && <p style={{"fontWeight":"bold"}}>{handleError(error)}</p>}
        </div>
    );
};

export default ErrorDisplay;