import { combineReducers } from 'redux'
import login from './login'
import goals from './goals'
import friends from './friends'
import friendRequests from './friendRequests'
import alerts from './alerts'
import currentGoal from './currentGoal'
import { LOGGING_OUT } from '../actions/actionTypes';



 const appReducer = combineReducers({
  login: login,
  goals: goals,
  friends: friends,
  currentGoal: currentGoal,
  alerts: alerts,
  friendRequests: friendRequests
});

const indexReducer = (state, action) => {
  if (action.type === LOGGING_OUT) {
    state = undefined;
  }
  return appReducer(state, action)
}

export default indexReducer