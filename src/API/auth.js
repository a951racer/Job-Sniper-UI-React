import axios from 'axios'

const apiRoot = 'http://localhost:5003/graphql'

export default class AuthAPI {

  async login(email, password) {
    const query = {
      query: `
        query {
          login(email: "${email}", password: "${password}"){
            userId
            token
            tokenExpiration
          }
        }
      `
    }

    const res = await axios.post(apiRoot, query)
    return res.data.data.login
  }
}