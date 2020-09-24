import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import FriendCard from '../components/FriendCard'



const Friends = (props) =>{
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Link to='/dashboard/new_friend'>Add Friend</Link> 
            </Row>
            <Row sm={3}>
            {props.friends.map((friendInfo, index) =>{
                return <FriendCard key={index} location={props.location} info={friendInfo} />
            })}
            </Row>
        </Container>

    )
}

const mapStateToProps = (state) => {
    return { friends: state.friends}
}

export default connect(mapStateToProps, null)(Friends)