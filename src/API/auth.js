import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
const apiRoot = env.REACT_APP_API + '/auth'

export default class AuthAPI {

  async login(email, password) {
    const res = await axios.post(apiRoot + '/login', {email, password})
    return res.data
  }
}