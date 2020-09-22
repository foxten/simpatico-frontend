import React from 'react'
import { connect } from 'react-redux';
import FriendCard from '../components/FriendCard'


const Friends = (props) =>{
    return (
        <div>FRIENDS HERE
            {/* link to add friend, modal window, ideally*/}
            {props.friends.map((friendInfo, index) =>{
                return <FriendCard key={index} info={friendInfo} />
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { friends: state.friends}
}

export default connect(mapStateToProps, null)(Friends)