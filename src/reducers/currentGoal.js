export default function currentGoal (state=null, action){

    switch(action.type){
        case 'FILTER_GOAL':
            return action.goal;
     default:
            return state
    }
}