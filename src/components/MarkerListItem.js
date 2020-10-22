import React from 'react';
import { Card } from 'react-bootstrap'

const MarkerListItem = (props) =>{
    return (
        props.data.accomplished === true? <strike><Card.Text><li>{props.data.title}</li></Card.Text></strike> : <Card.Text><li>{props.data.title}</li></Card.Text>
    )
}

export default MarkerListItem