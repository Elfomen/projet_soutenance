import React from 'react'
import './Error.css'
function Error({message}) {
    return (
        <div className="error">
            <p>{message}</p>
        </div>
    )
}

export default Error
