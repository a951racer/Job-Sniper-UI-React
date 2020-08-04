import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProfile } from '../Redux/actions/profile'

import PageLayout from '../Components/PageLayout'

class ProfilePage extends Component {

  componentDidMount() {
    this.props.fetchProfile()
  }

  render() {
    return (
      <PageLayout>
        <div>Profile</div>
      </PageLayout>
    )
  }
}

const mapDispatchToProps = {
  fetchProfile
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  isLoading: state.profile.isLoading,
  userStatus: state.auth.userStatus,
  userId: state.auth.userStatus,
  token: state.auth.token,
  tokenExpiration: state.auth.tokenExpiration
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
