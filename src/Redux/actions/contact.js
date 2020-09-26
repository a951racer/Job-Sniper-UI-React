import { REQUEST_CONTACTS,
  UPDATE_CONTACT,
  CONTACTS_RECEIVED,
  CONTACT_UPDATED,
  CREATE_CONTACT,
  CONTACT_CREATED,
  DELETE_CONTACT,
  CONTACT_DELETED
} from '../actionTypes/contacts'

import ContactAPI from '../../API/contact'

const api = new ContactAPI();

export const requestContacts = () => {
  return {
    type: REQUEST_CONTACTS
  }
}

export const contactsReceived = (contacts) => {
  return {
    type: CONTACTS_RECEIVED,
    contacts: contacts
  }
}

export const updateContact = () => {
  return {
    type: UPDATE_CONTACT
  }
}

export const contactUpdated = (contact) => {
  return {
    type: CONTACT_UPDATED,
    contact
  }
}

export const creatingContact = () => {
  return {
    type: CREATE_CONTACT
  }
}

export const contactCreated = (newContact) => {
  return {
    type: CONTACT_CREATED,
    newContact
  }
}

export const deletingContact = () => {
  return {
    type: DELETE_CONTACT
  }
}

export const contactDeleted = (deletedContact) => {
  return {
    type: CONTACT_DELETED,
    deletedContact
  }
}


export const fetchContacts = () => async (dispatch, getState) => {
  const state = getState()
  //if (state.contacts.contacts && state.contacts.contacts.length > 0) return
  dispatch(requestContacts())
  const contacts = await api.getContacts(state.auth.token)
  dispatch(contactsReceived(contacts))
}

export const saveContact = contact => async (dispatch, getState) => {
  const state = getState()
  dispatch(updateContact())
  const updatedContact = await api.saveContact(contact, state.auth.token)
  console.log('updated Contact: ', updatedContact.data.updateContact)
  dispatch(contactUpdated(updatedContact.data.updateContact))
}

export const createContact = contact => async (dispatch, getState) => {
  const state = getState()
  dispatch(creatingContact())
  const newContact = await api.createContact(contact, state.auth.token)
  dispatch(contactCreated(newContact))
}

export const deleteContact = contact => async dispatch => {
  dispatch(deletingContact())
  const deletedContact = await api.deleteContact(contact)
  dispatch(contactDeleted(deletedContact))
}