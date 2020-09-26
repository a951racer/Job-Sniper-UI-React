import { REQUEST_ACTIVITIES,
  UPDATE_ACTIVITY,
  ACTIVITIES_RECEIVED,
  ACTIVITY_UPDATED,
  CREATE_ACTIVITY,
  ACTIVITY_CREATED,
  DELETE_ACTIVITY,
  ACTIVITY_DELETED
} from '../actionTypes/activities'

import ActivityAPI from '../../API/activity'

const api = new ActivityAPI();

export const requestActivities = () => {
  return {
    type: REQUEST_ACTIVITIES
  }
}

export const activitiesReceived = (activities) => {
  return {
    type: ACTIVITIES_RECEIVED,
    activities: activities
  }
}

export const updateActivity = () => {
  return {
    type: UPDATE_ACTIVITY
  }
}

export const activityUpdated = (activity) => {
  return {
    type: ACTIVITY_UPDATED,
    activity
  }
}

export const creatingActivity = () => {
  return {
    type: CREATE_ACTIVITY
  }
}

export const activityCreated = (newActivity) => {
  return {
    type: ACTIVITY_CREATED,
    newActivity
  }
}

export const deletingActivity = () => {
  return {
    type: DELETE_ACTIVITY
  }
}

export const activityDeleted = (deletedActivity) => {
  return {
    type: ACTIVITY_DELETED,
    deletedActivity
  }
}


export const fetchActivities = () => async (dispatch, getState) => {
  const state = getState()
  //if (state.activities.activities && state.activities.activities.length > 0) return
  dispatch(requestActivities())
  const activities = await api.getActivities(state.auth.token)
  dispatch(activitiesReceived(activities))
}

export const saveActivity = activity => async dispatch => {
  dispatch(updateActivity())
  const updatedActivity = await api.saveActivity(activity)
  dispatch(activityUpdated(updatedActivity))
}

export const createActivity = activity => async dispatch => {
  dispatch(creatingActivity())
  const newActivity = await api.createActivity(activity)
  dispatch(activityCreated(newActivity))
}

export const deleteActivity = activity => async dispatch => {
  dispatch(deletingActivity())
  const deletedActivity = await api.deleteActivity(activity)
  dispatch(activityDeleted(deletedActivity))
}