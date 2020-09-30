import { LOGGING_OUT } from "./actionTypes";
 

export const loggedIn = (user) =>{
    return {
        type: 'LOGGING_IN',
        user: user
    }
}

export const currentUser = (user) =>{
    return {
        type: 'CURRENT_USER',
        user: user
    }
}

export const signingUp = (user) => {
    return {
        type: 'SIGNING_UP',
        user: user
    }
}

export const newFriendRequest = (friendRequest) => {
    return {
        type: 'NEW_FRIEND_REQUEST',
        friendRequest
    }
}

export const removeFriendRequest = (friendRequest) =>{
    return {
        type: 'REMOVE_FRIEND_REQUEST',

    }
}

export const loggingOut = () =>{
    return {
        type: LOGGING_OUT
    }
}