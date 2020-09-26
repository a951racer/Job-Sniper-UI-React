import { REQUEST_NOTES,
  UPDATE_NOTE,
  NOTES_RECEIVED,
  NOTE_UPDATED,
  CREATE_NOTE,
  NOTE_CREATED,
  DELETE_NOTE,
  NOTE_DELETED
} from '../actionTypes/notes'

import NoteAPI from '../../API/note'

const api = new NoteAPI();

export const requestNotes = () => {
  return {
    type: REQUEST_NOTES
  }
}

export const notesReceived = (notes) => {
  return {
    type: NOTES_RECEIVED,
    notes: notes
  }
}

export const updateNote = () => {
  return {
    type: UPDATE_NOTE
  }
}

export const noteUpdated = (note) => {
  return {
    type: NOTE_UPDATED,
    note
  }
}

export const creatingNote = () => {
  return {
    type: CREATE_NOTE
  }
}

export const noteCreated = (newNote) => {
  return {
    type: NOTE_CREATED,
    newNote
  }
}

export const deletingNote = () => {
  return {
    type: DELETE_NOTE
  }
}

export const noteDeleted = (deletedNote) => {
  return {
    type: NOTE_DELETED,
    deletedNote
  }
}


export const fetchNotes = () => async (dispatch, getState) => {
  const state = getState()
  //if (state.notes.notes && state.notes.notes.length > 0) return
  dispatch(requestNotes())
  const notes = await api.getNotes(state.auth.token)
  dispatch(notesReceived(notes))
}

export const saveNote = note => async dispatch => {
  dispatch(updateNote())
  const updatedNote = await api.saveNote(note)
  dispatch(noteUpdated(updatedNote))
}

export const createNote = note => async dispatch => {
  dispatch(creatingNote())
  const newNote = await api.createNote(note)
  dispatch(noteCreated(newNote))
}

export const deleteNote = note => async dispatch => {
  dispatch(deletingNote())
  const deletedNote = await api.deleteNote(note)
  dispatch(noteDeleted(deletedNote))
}