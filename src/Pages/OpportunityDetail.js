import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { useParams } from 'react-router-dom'
//import { DataTable } from 'primereact/datatable'
//import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Chips } from 'primereact/chips'
import { Calendar } from 'primereact/calendar'
import { Growl } from 'primereact/growl'
import moment from 'moment'

import NewOpportunityDialog from '../Components/NewOpportunityDialog'
import { fetchOpportunityById, saveOpportunity } from '../Redux/actions/opportunity'
import { fetchContacts } from '../Redux/actions/contact'

import PageLayout from '../Components/PageLayout'

class OpportunitiesPage extends Component {

  constructor(props) {
    super(props)
    //let { opportunityId } = useParams();
    const { params } = this.props.match
    this.opportunityId = params.opportunityId
  }

  componentDidMount() {
    this.props.fetchOpportunityById(this.opportunityId)
    this.getContacts()
  }

  getContacts = async () => {
    await this.props.fetchContacts()
    let contactList = this.props.contacts
    contactList = contactList.map(contact => {
      return {
        id: contact.id,
        label: contact.firstName + ' ' + contact.lastName + ' - ' + contact.organization
      }
    })
    contactList = [{id: '000', label: '-- None --'}, {id: '001', label: '-- New Contact --'}, ...contactList]
    contactList.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
    this.setState({contacts: contactList})
  }

    // Row Edit Functions
    onRowEditInit = (event) => {
      const opportunity = {...event.data}
      this.setState({editingOpportunity: opportunity})
    }
  
    onRowEditSave = async (event) => {
      await this.props.saveOpportunity(this.state.editingOpportunity)
      this.setState({editingOpportunity: null})
      this.growl.show({severity: 'success', summary: 'Saved', detail: 'Opportunity has been updated'})
    }
  
    onRowEditCancel = (event) => {
      this.setState({
          editingOpportunity: null
      })
    }
  
  // Editor control functions
    updateProperty = (property, value) => {
      const opportunity = {...this.state.editingOpportunity, [property]: value}
      this.setState({
        editingOpportunity: opportunity
      })
    }

    updateSourceContact = value => {
      let opportunity = {...this.state.editingOpportunity}
      if (!opportunity.sourceContact) opportunity.sourceContact = {}
      opportunity.sourceContact.id = value
      if (value === '000') opportunity.sourceContact = null
      this.setState({
        editingOpportunity: opportunity
      })
    }

  // Editors
    textEditor = (props) => {
      return <InputText type="text" value={this.state.editingOpportunity[props.field]} onChange={(e) => this.updateProperty(props.field, e.target.value)} />
    }

    tagsEditor = (props) => {
      return <Chips value={this.state.editingOpportunity.tags} onChange={(e) => this.updateProperty(props.field, e.target.value)} ></Chips>
    }

    sourceContactEditor = (props) => {
      return <Dropdown id="sourceContact"  value={this.state.editingOpportunity.sourceContact ? this.state.editingOpportunity.sourceContact.id : null} options={this.state.contacts} optionLabel="label" optionValue="id" style={{width: '15em'}} scrollHeight='200px' onChange={(e) => {this.updateSourceContact(e.target.value)}} />
    }

    dateEditor = (props) => {
      return <Calendar id="initialContactDate" dateFormat="dd/mm/yy" onChange={(e) => {this.updateProperty(props.field, e.target.value)}} value={this.state.editingOpportunity.initialContactDate}/>
    }

  // Templates
    tagsTemplate = (rowData) => {
      if (!rowData.tags || rowData.tags === "" || rowData.tags === []) return
      return rowData.tags.map(tag => <span className="tag">{tag}</span>)
    }
  
    sourceContactTemplate = (rowData) => {
      if (rowData.sourceContact)
        return <span>{rowData.sourceContact.firstName} {rowData.sourceContact.lastName} - {rowData.sourceContact.organization}</span>
      else
        return null
    }

    dateTemplate = (rowData) => {
      return <span>{moment(rowData.initialContactDate).format('MM/DD/YY')}</span>
    }

  render() {
    return (
      <PageLayout title="Opportunities">
        <NewOpportunityDialog />
        this.props.opportunity.employerName
        this.props.opportunity.initialContactDate

        <Growl ref={(el) => this.growl = el} />

      </PageLayout>
    )
  }
}

const mapDispatchToProps = {
  fetchOpportunityById,
  fetchContacts,
  saveOpportunity
}

const mapStateToProps = state => ({
  opportunity: state.opportunities.currentOpportunity,
  isLoading: state.opportunities.isLoading,
  contacts: state.contacts.contacts,
  userStatus: state.auth.userStatus,
  userId: state.auth.userStatus,
  token: state.auth.token,
  tokenExpiration: state.auth.tokenExpiration
})

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPage)