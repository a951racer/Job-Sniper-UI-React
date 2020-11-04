import React, { Component } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar';
import { connect } from 'react-redux'

import { createOpportunity } from '../Redux/actions/opportunity'
import { fetchContacts } from '../Redux/actions/contact'

class NewOpportunityDialog extends Component {
  
  emptyOpportunity = {
    employerName: '',
    jobTitle: '',
    source: '',
    sourceContact: '',
    employerURL: '',
    tags: []
  }

  constructor(props) {
    super(props)

    this.state = {
      showDialog: false,
      opportunity: this.emptyOpportunity,
      contacts: []
    }
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts = async () => {
    await this.props.fetchContacts()
    let contactList = this.props.contacts
    contactList = contactList.map(contact => {
      return {
        id: contact._id,
        label: contact.firstName + ' ' + contact.lastName + ' - ' + contact.organization
      }
    })
    contactList = [{id: '000', label: '-- None --'}, {id: '001', label: '-- New Contact --'}, ...contactList]
    contactList.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
    this.setState({contacts: contactList})  }

  updateProperty = (property, value) => {
    const opportunity = {...this.state.opportunity, [property]: value}
    this.setState({
      opportunity: opportunity
    })
  }

  cancel = () => {
    this.setState({
      opportunity: {...this.emptyOpportunity},
      showDialog: false
    })
  }

  save = async () => {
    this.props.createOpportunity(this.state.opportunity)
    this.setState({
      opportunity: {...this.emptyOpportunity},
      showDialog: false
    })
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancel}/>
                        <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={this.save}/>
                      </div>;

    return (
      <>
        <Button type="button" label="New" icon="pi pi-fw pi-plus" className="p-button-secondary" style={{marginBottom: '.5em'}} onClick={() => this.setState({showDialog: true})} ></Button>

        <Dialog visible={this.state.showDialog} style={{width:'25vw'}} header={'New Opportunity'} modal={true} footer={dialogFooter} onHide={this.cancel}>
          {
            <div className="p-grid p-fluid">
              <div className="p-col-4 "><label htmlFor="initialContactDate">Initial Contact Date</label></div>
              <div className="p-col-8">
                <Calendar id="initialContactDate" dateFormat="dd/mm/yy" onChange={(e) => {this.updateProperty('initialContactDate', e.target.value)}} value={this.state.opportunity.initialContactDate}/>
              </div>

              <div className="p-col-4 "><label htmlFor="employerName">Employer Name</label></div>
              <div className="p-col-8">
                <InputText id="employerName" onChange={(e) => {this.updateProperty('employerName', e.target.value)}} value={this.state.opportunity.employerName}/>
              </div>

              <div className="p-col-4 "><label htmlFor="jobTitle">Job Title</label></div>
              <div className="p-col-8">
                <InputText id="jobTitle" onChange={(e) => {this.updateProperty('jobTitle', e.target.value)}} value={this.state.opportunity.jobTitle}/>
              </div>

              <div className="p-col-4 "><label htmlFor="source">Source</label></div>
              <div className="p-col-8">
                <InputText id="source" onChange={(e) => {this.updateProperty('source', e.target.value)}} value={this.state.opportunity.source}/>
              </div>

              <div className="p-col-4 "><label htmlFor="sourceContact">Source Contact</label></div>
              <div className="p-col-8">
                <Dropdown id="sourceContact" value={this.state.opportunity.sourceContact} options={this.state.contacts} optionLabel="label" optionValue="id" style={{width: '15em'}} scrollHeight='200px' onChange={(e) => {this.updateProperty('sourceContact', e.target.value)}} />
              </div>

              <div className="p-col-4 "><label htmlFor="employerURL">Employer Website</label></div>
              <div className="p-col-8">
                <InputText id="employerURL" onChange={(e) => {this.updateProperty('employerURL', e.target.value)}} value={this.state.opportunity.employerURL}/>
              </div>

              <div className="p-col-4 "><label htmlFor="tags">Tags</label></div>
              <div className="p-col-8">
                <Chips value={this.state.opportunity.tags} onChange={(e) => this.updateProperty('tags', e.value)} ></Chips>
              </div>
            </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = {
  createOpportunity,
  fetchContacts
}

const mapStateToProps = state => ({
  contacts: state.contacts.contacts,
  isLoading: state.contacts.isLoading,
})

export default connect(mapStateToProps, mapDispatchToProps)(NewOpportunityDialog)