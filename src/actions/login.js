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

export const loggingOut = () =>{
    return {
        type: 'LOGGING_OUT',
    }
}