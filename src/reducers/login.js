export default function login (state=null, action){
    switch(action.type){
        case 'LOGGING_IN':
            case 'SIGNING_UP':
             case 'CURRENT_USER':
            return action.user;
       
        default:
            return state
    }
}