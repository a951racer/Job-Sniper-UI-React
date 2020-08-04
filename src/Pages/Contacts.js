import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Growl } from 'primereact/growl';

import NewContactDialog from '../Components/NewContactDialog'
import { fetchContacts, saveContact } from '../Redux/actions/contact'

import PageLayout from '../Components/PageLayout'

class ContactPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editingContact: null,
    }
  }

  componentDidMount() {
    this.props.fetchContacts()
  }

  // Row Edit Functions
  onRowEditInit = (event) => {
    const contact = {...event.data}
    this.setState({editingContact: contact})
  }

  onRowEditSave = async (event) => {
    await this.props.saveContact(this.state.editingContact)
    this.setState({editingContact: null})
    this.growl.show({severity: 'success', summary: 'Saved', detail: 'Contact has been updated'});
  }

  onRowEditCancel = (event) => {
    this.setState({
        editingContact: null
    })
  }

// Editor control functions
  updateProperty = (property, value) => {
    const contact = {...this.state.editingContact, [property]: value}
    this.setState({
      editingContact: contact
    })
  }

// Editors
  textEditor = (props) => {
    return <InputText type="text" value={this.state.editingContact[props.field]} onChange={(e) => this.updateProperty(props.field, e.target.value)} />;
  }

  render() {
    return (
      <PageLayout title="Contacts">
        <NewContactDialog />
        <DataTable
          value={this.props.contacts}
          paginator={true}
          rows={15}
          rowHover={true}
          autoLayout={true}
          dataKey="id"
          editMode="row"
          onRowEditInit={this.onRowEditInit}
          onRowEditSave={this.onRowEditSave}
          onRowEditCancel={this.onRowEditCancel}
        >
          <Column field="lastName" header="Last Name" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor} />
          <Column field="firstName" header="First Name" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor} />
          <Column field="organization" header="Company" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor} />
          <Column field="phone" header="Phone" editor={this.textEditor} />
          <Column field="email" header="Email" editor={this.textEditor} />
          <Column field="comments" header="Comments" filter={true} filterMatchMode="contains" editor={this.textEditor} />
          <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
        </DataTable>

        <Growl ref={(el) => this.growl = el} />

      </PageLayout>
    )
  }
}

const mapDispatchToProps = {
  fetchContacts,
  saveContact
}

const mapStateToProps = state => ({
  contacts: state.contacts.contacts,
  isLoading: state.contacts.isLoading,
  userStatus: state.auth.userStatus,
  userId: state.auth.userStatus,
  token: state.auth.token,
  tokenExpiration: state.auth.tokenExpiration
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
