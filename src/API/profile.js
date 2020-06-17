import axios from 'axios'

const apiRoot = 'http://localhost:5003/graphql'


export default class ProfileAPI {

  async getProfile(token) {
    const query = {
      query: `
        query {
          users {
            id
            firstName
            lastName
            email
            password
            isValidated
            isAdmin
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
    return res.data.data.profile
  }

  async saveProfile(profile) {
    const res = await axios.put(apiRoot + `/${profile._id}`, profile)
    return res.data
  }

  async createProfile(profile) {
    const res = await axios.post(apiRoot, profile)
    return res.data
  }

  async deleteProfile(profile) {
    const res = await axios.delete(apiRoot + `/${profile._id}`, profile)
    return res.data
  }
}