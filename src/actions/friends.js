export const listingFriends = (friends) =>{
    return {
        type: 'LIST_FRIENDS',
        friends: friends
    }
}

export const addFriend = (friend) =>{
    return {
        type: 'ADD_FRIEND',
        friend
    }
}

// export const editGoal = (goal) =>{
//     return {
//         type: 'EDIT_GOAL',
//         goal
//     }
// }

// export const deleteGoal = (goalId)=>{
//     return {
//         type: 'DELETE_GOAL',
//         goalId
//     }
// }   