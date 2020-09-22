export const grabbingGoals = (goals) =>{
    return {
        type: 'GRAB_GOALS',
        goals: goals
    }
}

export const addGoal = (goal) =>{
    return {
        type: 'ADD_GOAL',
        goal
    }
}

export const editGoal = (goal) =>{
    return {
        type: 'EDIT_GOAL',
        goal
    }
}

export const deleteGoal = (goalId)=>{
    return {
        type: 'DELETE_GOAL',
        goalId
    }
}   