import { combineReducers } from 'redux'
import login from './login'
import goals from './goals'
import friends from './friends'
import currentGoal from './currentGoal'


export default combineReducers({
  login: login,
  goals: goals,
  friends: friends,
  currentGoal: currentGoal
})