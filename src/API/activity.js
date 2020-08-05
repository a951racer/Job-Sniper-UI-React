import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
//const apiRoot = 'http://localhost:5003/graphql'
const apiRoot = env.REACT_APP_API


export default class ActivityAPI {

  async getActivities(token) {
    const query = {
      query: `
        query {
          activities {
            id
            activityType {
              activityType
            }
            activityDate
            contacts: {
              lastName
              firstName
            }
            opportunity {
              employerName
              jobTitle
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
    return res.data.data.activities
  }

  async saveActivity(activity) {
    const res = await axios.put(apiRoot + `/${activity._id}`, activity)
    return res.data
  }

  async createActivity(activity) {
    const res = await axios.post(apiRoot, activity)
    return res.data
  }

  async deleteActivity(activity) {
    const res = await axios.delete(apiRoot + `/${activity._id}`, activity)
    return res.data
  }
}