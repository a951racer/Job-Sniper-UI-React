import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
//const apiRoot = 'http://localhost:5003/graphql'
const apiRoot = env.REACT_APP_API

export default class NoteAPI {

  async getNotes(token) {
    const query = {
      query: `
        query {
          notes {
            id
            note
            user {
              email
            }
          }
        }
      `
    }

    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.post(apiRoot, query, options)
    return res.data.data.notes
  }

  async saveNote(note) {
    const res = await axios.put(apiRoot + `/${note._id}`, note)
    return res.data
  }

  async createNote(note) {
    const res = await axios.post(apiRoot, note)
    return res.data
  }

  async deleteNote(note) {
    const res = await axios.delete(apiRoot + `/${note._id}`, note)
    return res.data
  }
}