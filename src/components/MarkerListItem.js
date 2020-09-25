import React from 'react';

const MarkerListItem = (props) =>{
    return (
        props.data.accomplished === true? <strike><h2>{props.data.title}</h2></strike> : <h2>{props.data.title}</h2>
    )
}

export default MarkerListItem