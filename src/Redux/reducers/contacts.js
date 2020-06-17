import { REQUEST_CONTACTS,
  UPDATE_CONTACT,
  CONTACTS_RECEIVED,
  CONTACT_UPDATED,
  CREATE_CONTACT,
  CONTACT_CREATED,
  DELETE_CONTACT,
  CONTACT_DELETED
} from '../actionTypes/contacts'

const initialState = {
  contacts: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CONTACTS: {
      return {
        ...state,
        isLoading: true }
    }

    case CONTACTS_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        contacts: action.contacts
      }
    }

    case UPDATE_CONTACT: {
      return {
        ...state,
        isUpdating: true } 
    }

    case CONTACT_UPDATED: {
      const currState = {...state}
      let updatedContacts = currState.contacts.map(contact => {
        if (contact.id === action.contact.id) return action.contact
        return contact
      })
      return {
        ...state,
        isUpdating: false,
        contacts: updatedContacts
      }
    }

    case CREATE_CONTACT: {
      return {
        ...state,
        isCreating: true
      }
    }

    case CONTACT_CREATED: {
      return {
        ...state,
        contacts: [...state.contacts, action.newContact],
        isCreating: false
      }
    }

    case DELETE_CONTACT: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case CONTACT_DELETED: {
      const currState = {...state}
      let updatedContacts = currState.contacts.filter(contact => {
        if (contact._id !== action.deletedContact._id) return true
        return false
      })
      return {
        ...state,
        contacts: updatedContacts,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default contacts