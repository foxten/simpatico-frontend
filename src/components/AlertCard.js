import React from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap'


const AlertCard= (props) =>{
    console.log(props.info)

    const handleClick = event =>{
        console.log(event.target.name)
    }

    return (
        <Card>
            <Card.Body>
                <h2>{props.info.message}</h2>
                <Button name={props.info.alertable_type} onClick={handleClick}>Click Me!</Button>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = (state) =>{
    return {alerts : state.alerts}
}

export default connect(mapStateToProps, null)(AlertCard)