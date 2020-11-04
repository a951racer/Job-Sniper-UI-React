import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
const apiRoot = env.REACT_APP_API + '/user'

export default class ProfileAPI {

  async getProfile(token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.get(apiRoot, options)
    return res.data.data
  }

  async saveProfile(profile, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.put(apiRoot + `/${profile._id}`, profile, options)
    return res.data
  }

  async createProfile(profile, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.post(apiRoot, profile, options)
    return res.data
  }

  async deleteProfile(profile, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.delete(apiRoot + `/${profile._id}`, profile, options)
    return res.data
  }
}