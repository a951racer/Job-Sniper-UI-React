import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
//const apiRoot = 'http://localhost:5003/graphql'
const apiRoot = env.REACT_APP_API

export default class ContactAPI {

  async getContacts(token) {
    const query = {
      query: `
        query {
          contacts {
            id
            firstName
            lastName
            organization
            phone
            email
            comments
            user {
              lastName
              email
            }
            created
            lastUpdated
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
    return res.data.data.contacts
  }

  async saveContact(contact, token) {
    const query = {
      query: `
        mutation {
          updateContact (id: "${contact.id}", contact: {
                firstName: "${contact.firstName}"
                lastName: "${contact.lastName}"
                organization: "${contact.organization}"
                phone: "${contact.phone}"
                email: "${contact.email}"
                comments: "${contact.comments}"
          }){
            id
            firstName
            lastName
            organization
            phone
            email
            comments
            created
            lastUpdated
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
    return res.data
  }

  async createContact(contact, token) {
    console.log('api creating: ', contact)
    const query = {
      query: `
        mutation {
          createContact (contact: {
                firstName: "${contact.firstName}"
                lastName: "${contact.lastName}"
                organization: "${contact.organization}"
                phone: "${contact.phone}"
                email: "${contact.email}"
                comments: "${contact.comments}"
          }){
            id
            firstName
            lastName
            organization
            phone
            email
            comments
            created
            lastUpdated
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
    return res.data.data.createContact
  }

  async deleteContact(contact) {
    const res = await axios.delete(apiRoot + `/${contact._id}`, contact)
    return res.data
  }
}
