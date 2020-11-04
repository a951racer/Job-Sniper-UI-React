import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
const apiRoot = env.REACT_APP_API + '/contact'

export default class ContactAPI {

  async getContacts(token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.get(apiRoot, options)
    return res.data
  }

  async saveContact(contact, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    
    const res = await axios.put(apiRoot, contact, options)
    return res.data
  }

  async createContact(contact, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.post(apiRoot, contact, options)
    return res.data
  }

  async deleteContact(contact, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.delete(apiRoot + `/${contact._id}`, contact, options)
    return res.data
  }
}
