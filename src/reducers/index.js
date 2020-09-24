import { combineReducers } from 'redux'
import login from './login'
import goals from './goals'
import friends from './friends'
import currentGoal from './currentGoal'
import { LOGGING_OUT } from '../actions/actionTypes';



 const appReducer = combineReducers({
  login: login,
  goals: goals,
  friends: friends,
  currentGoal: currentGoal,
});

const indexReducer = (state, action) => {
  if (action.type === LOGGING_OUT) {
    state = undefined;
  }
  return appReducer(state, action)
}

export default indexReducer