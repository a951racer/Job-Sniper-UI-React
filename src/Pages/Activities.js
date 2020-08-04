import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchActivities } from '../Redux/actions/activity'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import PageLayout from '../Components/PageLayout'

class ActivitiesPage extends Component {

  componentDidMount() {
    this.props.fetchActivities()
  }

  render() {
    return (
      <PageLayout title="Activities">
        <DataTable
          value={this.props.contacts}
          paginator={true}
          rows={15}
          rowHover={true}
          autoLayout={true}
          dataKey="id"
          className="p-datatable-sniper"
        >
          <Column field="activityDate" header="Date" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="activityType" header="Type" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="comments" header="Comments" sortable={true} filter={true} filterMatchMode="contains"/>
        </DataTable>
      </PageLayout>
    )
  }
}

const mapDispatchToProps = {
  fetchActivities
}

const mapStateToProps = state => ({
  activities: state.activities.activities,
  isLoading: state.activities.isLoading,
  userStatus: state.auth.userStatus,
  userId: state.auth.userStatus,
  token: state.auth.token,
  tokenExpiration: state.auth.tokenExpiration
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage)
