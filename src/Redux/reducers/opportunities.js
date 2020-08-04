import { REQUEST_OPPORTUNITIES,
  UPDATE_OPPORTUNITY,
  OPPORTUNITIES_RECEIVED,
  OPPORTUNITY_UPDATED,
  CREATE_OPPORTUNITY,
  OPPORTUNITY_CREATED,
  DELETE_OPPORTUNITY,
  OPPORTUNITY_DELETED
} from '../actionTypes/opportunities'

const initialState = {
  opportunities: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const opportunities = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_OPPORTUNITIES: {
      return {
        ...state,
        isLoading: true }
    }

    case OPPORTUNITIES_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        opportunities: action.opportunities
      }
    }

    case UPDATE_OPPORTUNITY: {
      return {
        ...state,
        isUpdating: true } 
    }

    case OPPORTUNITY_UPDATED: {
      const currState = {...state}
      let updatedOpportunities = currState.opportunities.map(opportunity => {
        if (opportunity.id === action.opportunity.id) return action.opportunity
        return opportunity
      })
      return {
        ...state,
        isUpdating: false,
        opportunities: updatedOpportunities
      }
    }

    case CREATE_OPPORTUNITY: {
      return {
        ...state,
        isCreating: true
      }
    }

    case OPPORTUNITY_CREATED: {
      return {
        ...state,
        opportunities: [...state.opportunities, action.newOpportunity],
        isCreating: false
      }
    }

    case DELETE_OPPORTUNITY: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case OPPORTUNITY_DELETED: {
      const currState = {...state}
      let updatedOpportunities = currState.opportunities.filter(opportunity => {
        if (opportunity._id !== action.deletedOpportunity._id) return true
        return false
      })
      return {
        ...state,
        opportunities: updatedOpportunities,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default opportunities