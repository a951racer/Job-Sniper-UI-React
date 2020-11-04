import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
const apiRoot = env.REACT_APP_API + '/note'

export default class NoteAPI {

  async getNotes(token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.get(apiRoot, options)
    return res.data
  }

  async saveNote(note, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.put(apiRoot + `/${note._id}`, note, options)
    return res.data
  }

  async createNote(note, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.post(apiRoot, note, options)
    return res.data
  }

  async deleteNote(note, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.delete(apiRoot + `/${note._id}`, note, options)
    return res.data
  }
}