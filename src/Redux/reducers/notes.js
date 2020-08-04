import { REQUEST_NOTES,
  UPDATE_NOTE,
  NOTES_RECEIVED,
  NOTE_UPDATED,
  CREATE_NOTE,
  NOTE_CREATED,
  DELETE_NOTE,
  NOTE_DELETED
} from '../actionTypes/notes'

const initialState = {
  notes: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const notes = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NOTES: {
      return {
        ...state,
        isLoading: true }
    }

    case NOTES_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        notes: action.notes
      }
    }

    case UPDATE_NOTE: {
      return {
        ...state,
        isUpdating: true } 
    }

    case NOTE_UPDATED: {
      const currState = {...state}
      let updatedNotes = currState.notes.map(note => {
        if (note._id === action.note._id) return action.note
        return note
      })
      return {
        ...state,
        isUpdating: false,
        notes: updatedNotes
      }
    }

    case CREATE_NOTE: {
      return {
        ...state,
        isCreating: true
      }
    }

    case NOTE_CREATED: {
      return {
        ...state,
        notes: [...state.notes, action.newNote],
        isCreating: false
      }
    }

    case DELETE_NOTE: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case NOTE_DELETED: {
      const currState = {...state}
      let updatedNotes = currState.notes.filter(note => {
        if (note._id !== action.deletedNote._id) return true
        return false
      })
      return {
        ...state,
        notes: updatedNotes,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default notes