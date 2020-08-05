import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
//const apiRoot = 'http://localhost:5003/graphql'
const apiRoot = env.REACT_APP_API

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