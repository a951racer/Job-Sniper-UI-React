import axios from 'axios'

const apiRoot = 'http://localhost:5003/graphql'


export default class OpportunityAPI {

  async getOpportunities(token) {
    const query = {
      query: `
        query {
          opportunities {
            id
            employerName
            jobTitle
            initialContactDate
            source
            sourceContact {
              id
              lastName
              firstName
              organization
            }
            employerURL
            tags
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
    return res.data.data.opportunities
  }

  async saveOpportunity(opportunity, token) {
    console.log('saving: ', opportunity)
    const sourceContact = opportunity.sourceContact ? `"${opportunity.sourceContact.id}"` : null
    const employerURL = opportunity.employerURL ? `"${opportunity.employerURL}"`: null
    const tags = opportunity.tags ? opportunity.tags.map(tag => `"${tag}"`) : ""
    const query = {
      query: `
        mutation {
          updateOpportunity(id: "${opportunity.id}", opportunity: {
            employerName: "${opportunity.employerName}"
            jobTitle: "${opportunity.jobTitle}"
            initialContactDate: "${opportunity.initialContactDate}"
            source: "${opportunity.source}"
            sourceContact: ${sourceContact}
            employerURL: ${employerURL}
            tags: [${tags}]
          }){
            id
            employerName
            jobTitle
            source
            sourceContact {
              id
              lastName
              firstName
            }
            employerURL
            tags
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
    return res.data.data.updateOpportunity
  }

  async createOpportunity(opportunity, token) {
    const sourceContact = opportunity.sourceContact ? `"${opportunity.sourceContact}"` : null
    const employerURL = opportunity.employerURL ? `"${opportunity.employerURL}"`: null
    const tags = opportunity.tags ? opportunity.tags.map(tag => `"${tag}"`) : ""
    const query = {
      query: `
        mutation {
          createOpportunity(opportunity: {
            employerName: "${opportunity.employerName}"
            jobTitle: "${opportunity.jobTitle}"
            initialContactDate: "${opportunity.initialContactDate}"
            source: "${opportunity.source}"
            sourceContact: ${sourceContact}
            employerURL: ${employerURL}
            tags: [${tags}]
          }){
            id
            employerName
            jobTitle
            source
            sourceContact {
              id
              lastName
              firstName
            }
            employerURL
            tags
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
    return res.data.data.createOpportunity
  }

  async deleteOpportunity(opportunity) {
    const res = await axios.delete(apiRoot + `/${opportunity._id}`, opportunity)
    return res.data
  }
}