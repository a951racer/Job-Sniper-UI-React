import { combineReducers } from 'redux'
import auth from './auth'
import opportunities from './opportunities'
import contacts from './contacts'
import activities from './activities'
import notes from './notes'
import profile from './profile'

export default combineReducers({
  auth,
  opportunities,
  contacts,
  activities,
  notes,
  profile
})
