import React, { useEffect, useState } from 'react';
import {ApiCall} from './ApiCall';

export const ApiContainer = () => {
    const [containerState, setContainerState] = useState([]);

    useEffect(() => {
        ApiCall().then(data => setContainerState(data))
    }, []);

    return(
        <>
            <h1>API Results</h1>
            {containerState.slice(0).map(containerItem => (
                <h2 key={containerItem}></h2>
            ))}
        </>
    )
}

export default ApiContainer;