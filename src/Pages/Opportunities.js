import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Chips } from 'primereact/chips'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { Growl } from 'primereact/growl'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import moment from 'moment'

import NewOpportunityDialog from '../Components/NewOpportunityDialog'
import { fetchOpportunities, saveOpportunity, deleteOpportunity } from '../Redux/actions/opportunity'
import { fetchContacts } from '../Redux/actions/contact'

import PageLayout from '../Components/PageLayout'

class OpportunitiesPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editingOpportunity: null,
      contacts: [],
      deleteOpportunityDialog: false,
      redirect: false,
      redirectTo:'',
    }
  }

  componentDidMount() {
    this.props.fetchOpportunities()
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
    this.setState({contacts: contactList})
  }

  confirmDeleteOpportunity = (opportunity) => {
    this.setState({
        editingOpportunity: opportunity,
        deleteOpportunityDialog: true
    });
  }

  hideDeleteOpportunityDialog = () => {
    this.setState({ deleteOpportunityDialog: false })
  }

  deleteSelectedOpportunity = async () => {
    this.setState({ deleteOpportunityDialog: false })
    await this.props.deleteOpportunity(this.state.editingOpportunity)
    this.setState({editingOpportunity: null})
    this.growl.show({severity: 'success', summary: 'Deleted', detail: 'Opportunity has been deleted'})
  }

  showDetails = () => {
    //navigate
  }

  handleDetailClick = (id) => {
    this.setState({redirect: true, redirectTo: `/opportunityDetail/${id}`})
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
    opportunity.sourceContact._id = value
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
    return <Dropdown id="sourceContact"  value={this.state.editingOpportunity.sourceContact ? this.state.editingOpportunity.sourceContact._id : null} options={this.state.contacts} optionLabel="label" optionValue="id" style={{width: '15em'}} scrollHeight='200px' onChange={(e) => {this.updateSourceContact(e.target.value)}} />
  }

  dateEditor = (props) => {
    return <Calendar id="initialContactDate" dateFormat="dd/mm/yy" onChange={(e) => {this.updateProperty(props.field, e.target.value)}} value={this.state.editingOpportunity.initialContactDate}/>
  }

// Templates
  tagsTemplate = (rowData) => {
    if (!rowData.tags || rowData.tags === "" || rowData.tags === []) return
    return rowData.tags.map(tag => <span className="tag" key="tag">{tag}</span>)
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

  deleteTemplate = (rowData) => {
      return <Button icon="pi pi-trash" className="p-button-rounded p-button-secondary p-button-text" onClick={() => this.confirmDeleteOpportunity(rowData)} />
  }

  detailsTemplate = (rowData) => {
    return <Button icon="pi pi-search" className="p-button-rounded p-button-secondary p-button-text" onClick={() => this.showDetails(rowData)} />
  }

  render() {
    const deleteOpportunityDialogFooter = (
      <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteOpportunityDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedOpportunity} />
      </React.Fragment>
    )

  
  detailBodyTemplate = (rowData) => {
    return (
        <Button type="button" icon="pi pi-search" className="p-button-secondary" onClick={() => this.handleDetailClick(rowData._id)}></Button>
    )
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirectTo} />;
    }
    return (
      <PageLayout title="Opportunities">
        <NewOpportunityDialog />
        <DataTable
          value={this.props.opportunities}
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
          <Column body={this.detailsTemplate}></Column>
          <Column body={this.detailBodyTemplate} headerStyle={{width: '4em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
          <Column field="initialContactDate" header="Initial Contact" sortable={true} filter={true} filterMatchMode="contains" body={this.dateTemplate} editor={this.dateEditor} />
          <Column field="employerName" header="Employer" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor} />
          <Column field="jobTitle" header="Job Title" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor} />
          <Column field="source" header="Source" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor} />
          <Column field="sourceContact.lastName" header="Source Contact" sortable={true} filter={true} filterMatchMode="contains" body={this.sourceContactTemplate} editor={this.sourceContactEditor}/>
          <Column field="employerURL" header="Employer Website" editor={this.textEditor} />
          <Column field="tags" header="Tags" filter={true} filterMatchMode="contains" body={this.tagsTemplate} editor={this.tagsEditor} />
          <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
          <Column body={this.deleteTemplate}></Column>
        </DataTable>

        <Growl ref={(el) => this.growl = el} />

        <Dialog visible={this.state.deleteOpportunityDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteOpportunityDialogFooter} onHide={this.hideDeleteOpportunityDialog}>
          <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
              {this.state.editingOpportunity && <span>Are you sure you want to delete the selected Opportunity?</span>}
          </div>
        </Dialog>

      </PageLayout>
    )
  }
}

const mapDispatchToProps = {
  fetchOpportunities,
  fetchContacts,
  saveOpportunity,
  deleteOpportunity
}

const mapStateToProps = state => ({
  opportunities: state.opportunities.opportunities,
  isLoading: state.opportunities.isLoading,
  contacts: state.contacts.contacts,
  userStatus: state.auth.userStatus,
  userId: state.auth.userStatus,
  token: state.auth.token,
  tokenExpiration: state.auth.tokenExpiration
})

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPage)
