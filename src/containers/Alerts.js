import React from 'react';
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap';
import AlertCard from '../components/AlertCard';


const Alerts = (props) =>{
    return (
        <Container>
        {props.alerts.map((alert, index) => {
            return (
                <AlertCard key={index} info={alert} />
        )
        })}
        </Container>
    )
}

const mapStateToProps = (state) =>{
    return { alerts: state.alerts }
}

export default connect(mapStateToProps, null)(Alerts)