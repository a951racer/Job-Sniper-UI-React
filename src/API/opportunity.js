import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
const apiRoot = env.REACT_APP_API + '/opportunity'

export default class OpportunityAPI {

  async getOpportunities(token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.get(apiRoot, options)
    return res.data
  }

  async getOpportunityById(opportunity) {
    const res = await axios.opportunityById(apiRoot + `/${opportunity._id}`, opportunity)
    return res.data.data.opportunity
  }

  async saveOpportunity(opportunity, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.put(apiRoot + `/${opportunity._id}`, opportunity, options)
    return res.data
  }

  async createOpportunity(opportunity, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.post(apiRoot, opportunity, options)
    return res.data
  }

  async deleteOpportunity(opportunity, token) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const res = await axios.delete(apiRoot + `/${opportunity._id}`, options)
    return res.data
  }
}