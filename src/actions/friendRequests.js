export const grabbingFriendRequests = (friendRequests) =>{
    return {
        type: 'GRAB_FRIEND_REQUESTS',
        friendRequests: friendRequests
    }
}

export const newFriendRequest = (friendRequest) =>{
    return {
        type: 'NEW_FRIEND_REQUEST',
        friendRequest
    }
}

export const removeFriendRequest = (friendRquestId)=>{
    return {
        type: 'REMOVE_FRIEND_REQUEST',
        friendRquestId
    }
}   