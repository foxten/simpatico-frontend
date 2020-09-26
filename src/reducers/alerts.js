export default function alerts (state=[], action){
    // let index; 

    switch(action.type){
        case 'GRABBING_ALERTS':
            return action.alerts;
            
        default:
            return state
        // case 'ADD_GOAL':
        //     return [...state, action.goal];

        // case 'EDIT_GOAL':
        //     index = state.findIndex(goal => goal.ugg_id === action.goal.id);
        //     state.splice(index, 1, action.goal)
        //     return state;

        // case 'DELETE_GOAL':
        //     return state.filter(goal => goal.ugg_id !== action.goalId)

    }
}