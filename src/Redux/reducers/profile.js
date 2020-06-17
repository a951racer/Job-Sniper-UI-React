import { REQUEST_PROFILE,
  UPDATE_PROFILE,
  PROFILE_RECEIVED,
  PROFILE_UPDATED,
  CREATE_PROFILE,
  PROFILE_CREATED,
  DELETE_PROFILE,
  PROFILE_DELETED
} from '../actionTypes/profile'

const initialState = {
  profile: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PROFILE: {
      return {
        ...state,
        isLoading: true }
    }

    case PROFILE_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        profile: action.profile
      }
    }

    case UPDATE_PROFILE: {
      return {
        ...state,
        isUpdating: true } 
    }

    case PROFILE_UPDATED: {
      const currState = {...state}
      let updatedProfile = currState.profile.map(profile => {
        if (profile._id === action.profile._id) return action.profile
        return profile
      })
      return {
        ...state,
        isUpdating: false,
        profile: updatedProfile
      }
    }

    case CREATE_PROFILE: {
      return {
        ...state,
        isCreating: true
      }
    }

    case PROFILE_CREATED: {
      return {
        ...state,
        profile: [...state.profile, action.newOpportunity],
        isCreating: false
      }
    }

    case DELETE_PROFILE: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case PROFILE_DELETED: {
      const currState = {...state}
      let updatedProfile = currState.profile.filter(profile => {
        if (profile._id !== action.deletedOpportunity._id) return true
        return false
      })
      return {
        ...state,
        profile: updatedProfile,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default profile