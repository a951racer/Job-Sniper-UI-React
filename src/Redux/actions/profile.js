import { REQUEST_PROFILE,
  UPDATE_PROFILE,
  PROFILE_RECEIVED,
  PROFILE_UPDATED,
  CREATE_PROFILE,
  PROFILE_CREATED,
  DELETE_PROFILE,
  PROFILE_DELETED
} from '../actionTypes/profile'

import ProfileAPI from '../../API/profile'

const api = new ProfileAPI();

export const requestProfile = () => {
  return {
    type: REQUEST_PROFILE
  }
}

export const profileReceived = (profile) => {
  return {
    type: PROFILE_RECEIVED,
    profile: profile
  }
}

export const updateProfile = () => {
  return {
    type: UPDATE_PROFILE
  }
}

export const profileUpdated = (profile) => {
  return {
    type: PROFILE_UPDATED,
    profile
  }
}

export const creatingProfile = () => {
  return {
    type: CREATE_PROFILE
  }
}

export const profileCreated = (newProfile) => {
  return {
    type: PROFILE_CREATED,
    newProfile
  }
}

export const deletingProfile = () => {
  return {
    type: DELETE_PROFILE
  }
}

export const profileDeleted = (deletedProfile) => {
  return {
    type: PROFILE_DELETED,
    deletedProfile
  }
}


export const fetchProfile = () => async (dispatch, getState) => {
  const state = getState()
  //if (state.profile.profile && state.profile.profile.length > 0) return
  dispatch(requestProfile())
  const profile = await api.getProfile(state.auth.token)
  dispatch(profileReceived(profile))
}

export const saveProfile = profile => async (dispatch, getState) => {
  const state = getState()
  dispatch(updateProfile())
  const updatedProfile = await api.saveProfile(profile, state.auth.token)
  dispatch(profileUpdated(updatedProfile))
}

export const createProfile = profile => async (dispatch, getState) => {
  const state = getState()
  dispatch(creatingProfile())
  const newProfile = await api.createProfile(profile, state.auth.token)
  dispatch(profileCreated(newProfile))
}

export const deleteProfile = profile => async (dispatch, getState) => {
  const state = getState()
  dispatch(deletingProfile())
  const deletedProfile = await api.deleteProfile(profile, state.auth.token)
  dispatch(profileDeleted(deletedProfile))
}