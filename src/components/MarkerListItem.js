import React from 'react';

const MarkerListItem = (props) =>{
    return (
        props.data.accomplished === true? <strike><h4><li>{props.data.title}</li></h4></strike> : <h4><li>{props.data.title}</li></h4>
    )
}

export default MarkerListItem