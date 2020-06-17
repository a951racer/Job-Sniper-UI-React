import { REQUEST_ACTIVITIES,
  UPDATE_ACTIVITY,
  ACTIVITIES_RECEIVED,
  ACTIVITY_UPDATED,
  CREATE_ACTIVITY,
  ACTIVITY_CREATED,
  DELETE_ACTIVITY,
  ACTIVITY_DELETED
} from '../actionTypes/activities'

const initialState = {
  activities: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const activities = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ACTIVITIES: {
      return {
        ...state,
        isLoading: true }
    }

    case ACTIVITIES_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        activities: action.activities
      }
    }

    case UPDATE_ACTIVITY: {
      return {
        ...state,
        isUpdating: true } 
    }

    case ACTIVITY_UPDATED: {
      const currState = {...state}
      let updatedActivities = currState.activities.map(activity => {
        if (activity._id === action.activity._id) return action.activity
        return activity
      })
      return {
        ...state,
        isUpdating: false,
        activities: updatedActivities
      }
    }

    case CREATE_ACTIVITY: {
      return {
        ...state,
        isCreating: true
      }
    }

    case ACTIVITY_CREATED: {
      return {
        ...state,
        activities: [...state.activities, action.newActivity],
        isCreating: false
      }
    }

    case DELETE_ACTIVITY: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case ACTIVITY_DELETED: {
      const currState = {...state}
      let updatedActivities = currState.activities.filter(activity => {
        if (activity._id !== action.deletedActivity._id) return true
        return false
      })
      return {
        ...state,
        activities: updatedActivities,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default activities