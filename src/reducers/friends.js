export default function goals (state=[], action){
    // let index; 

    switch(action.type){
        case 'LIST_FRIENDS':
            return action.friends;

        // case 'ADD_GOAL':
        //     return [...state, action.goal];

        // case 'EDIT_GOAL':
        //     index = state.findIndex(goal => goal.ugg_id === action.goal.id);
        //     state.splice(index, 1, action.goal)
        //     return state;

        // case 'DELETE_GOAL':
        //     return state.filter(goal => goal.ugg_id !== action.goalId)

        default:
            return state
    }
}