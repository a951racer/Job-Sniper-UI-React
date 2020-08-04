import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../Redux/actions/auth'

import PageLayout from '../Components/PageLayout'

class LogoutPage extends Component {

  render() {
    return (
      <PageLayout>
        <div>Logout</div>
      </PageLayout>
    )
  }
}

const mapDispatchToProps = {
  logout
}

const mapStateToProps = state => ({
  userStatus: state.auth.userStatus,
  userId: state.auth.userStatus,
  token: state.auth.token,
  tokenExpiration: state.auth.tokenExpiration
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)
