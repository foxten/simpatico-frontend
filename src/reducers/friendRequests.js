export default function friendRequest (state=[], action){
    let index;

    switch(action.type){
        case 'GRAB_FRIEND_REQUESTS':
            return action.friendRequests;

        case 'NEW_FRIEND_REQUEST':
            return [...state, action.friendRequest]

        case 'REMOVE_FRIEND_REQUEST':
            console.log(state)
            index = state.findIndex(friendRequest => friendRequest.id === action.friendRequestId)    
            state.splice(index, 1)
            return state
       
        default:
            return state
    }
}