import React, { Component } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { connect } from 'react-redux'

import { createContact } from '../Redux/actions/contact'

class NewContactDialog extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      showDialog: false,
      contact: {
        firstName: null,
        lastName: null,
        organization: null,
        phone: null,
        email: null,
        comments: null
      }
    }
  }

  updateProperty = (property, value) => {
    const contact = {...this.state.contact, [property]: value}
    this.setState({
      contact: contact
    })
  }

  cancel = () => {
    this.setState({
      contact: {},
      showDialog: false
    })
  }

  save = async () => {
    console.log('about to save: ', this.state.contact)
    this.props.createContact(this.state.contact)
    this.setState({
      contact: {},
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

        <Dialog visible={this.state.showDialog} style={{width:'25vw'}} header={'New Contact'} modal={true} footer={dialogFooter} onHide={this.cancel}>
          {
            <div className="p-grid p-fluid">
            <div className="p-col-4 "><label htmlFor="firstName">First Name</label></div>
            <div className="p-col-8">
              <InputText id="firstName" onChange={(e) => {this.updateProperty('firstName', e.target.value)}} value={this.state.contact.firstName}/>
            </div>

            <div className="p-col-4 "><label htmlFor="lastName">Last Name</label></div>
            <div className="p-col-8">
              <InputText id="lastName" onChange={(e) => {this.updateProperty('lastName', e.target.value)}} value={this.state.contact.lastName}/>
            </div>

            <div className="p-col-4 "><label htmlFor="organization">Organization</label></div>
            <div className="p-col-8">
              <InputText id="organization" onChange={(e) => {this.updateProperty('organization', e.target.value)}} value={this.state.contact.organization}/>
            </div>

            <div className="p-col-4 "><label htmlFor="phone">Phone</label></div>
            <div className="p-col-8">
              <InputText id="phone" onChange={(e) => {this.updateProperty('phone', e.target.value)}} value={this.state.contact.phone}/>
            </div>

            <div className="p-col-4 "><label htmlFor="email">Email</label></div>
            <div className="p-col-8">
              <InputText id="email" onChange={(e) => {this.updateProperty('email', e.target.value)}} value={this.state.contact.email}/>
            </div>

            <div className="p-col-4 "><label htmlFor="comments">Comments</label></div>
            <div className="p-col-8">
              <InputText id="comments" onChange={(e) => {this.updateProperty('comments', e.target.value)}} value={this.state.contact.comments}/>
            </div>
        </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { createContact }

export default connect(null, mapDispatchToProps)(NewContactDialog)