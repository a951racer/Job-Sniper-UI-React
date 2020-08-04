import { REQUEST_OPPORTUNITIES,
  UPDATE_OPPORTUNITY,
  OPPORTUNITIES_RECEIVED,
  OPPORTUNITY_UPDATED,
  CREATE_OPPORTUNITY,
  OPPORTUNITY_CREATED,
  DELETE_OPPORTUNITY,
  OPPORTUNITY_DELETED
} from '../actionTypes/opportunities'

import OpportunityAPI from '../../API/opportunity'

const api = new OpportunityAPI();

export const requestOpportunities = () => {
  return {
    type: REQUEST_OPPORTUNITIES
  }
}

export const opportunitiesReceived = (opportunities) => {
  return {
    type: OPPORTUNITIES_RECEIVED,
    opportunities: opportunities
  }
}

export const updateOpportunity = () => {
  return {
    type: UPDATE_OPPORTUNITY
  }
}

export const opportunityUpdated = (opportunity) => {
  return {
    type: OPPORTUNITY_UPDATED,
    opportunity
  }
}

export const creatingOpportunity = () => {
  return {
    type: CREATE_OPPORTUNITY
  }
}

export const opportunityCreated = (newOpportunity) => {
  return {
    type: OPPORTUNITY_CREATED,
    newOpportunity
  }
}

export const deletingOpportunity = () => {
  return {
    type: DELETE_OPPORTUNITY
  }
}

export const opportunityDeleted = (deletedOpportunity) => {
  return {
    type: OPPORTUNITY_DELETED,
    deletedOpportunity
  }
}


export const fetchOpportunities = () => async (dispatch, getState) => {
  const state = getState()
  if (state.opportunities.opportunities && state.opportunities.opportunities.length > 0) return
  dispatch(requestOpportunities())
  const opportunities = await api.getOpportunities(state.auth.token)
  dispatch(opportunitiesReceived(opportunities))
}

export const saveOpportunity = opportunity => async (dispatch, getState) => {
  const state = getState()
  dispatch(updateOpportunity())
  const updatedOpportunity = await api.saveOpportunity(opportunity, state.auth.token)
  dispatch(opportunityUpdated(updatedOpportunity))
}

export const createOpportunity = opportunity => async (dispatch, getState) => {
  const state = getState()
  dispatch(creatingOpportunity())
  const newOpportunity = await api.createOpportunity(opportunity, state.auth.token)
  dispatch(opportunityCreated(newOpportunity))
}

export const deleteOpportunity = opportunity => async dispatch => {
  dispatch(deletingOpportunity())
  const deletedOpportunity = await api.deleteOpportunity(opportunity)
  dispatch(opportunityDeleted(deletedOpportunity))
}