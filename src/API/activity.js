import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
const apiRoot = env.REACT_APP_API + '/activity'


export default class ActivityAPI {

  async getActivities(token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.get(apiRoot, options)
    return res.data
  }

  async saveActivity(activity, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.put(apiRoot + `/${activity._id}`, activity, options)
    return res.data
  }

  async createActivity(activity, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.post(apiRoot, activity, options)
    return res.data
  }

  async deleteActivity(activity, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.delete(apiRoot + `/${activity._id}`, activity, options)
    return res.data
  }
}