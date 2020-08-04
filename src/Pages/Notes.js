import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNotes } from '../Redux/actions/note'

import PageLayout from '../Components/PageLayout'

class NotesPage extends Component {

  componentDidMount() {
    this.props.fetchNotes()
  }

  render() {
    return (
      <PageLayout>
        <div>Notes</div>
      </PageLayout>
    )
  }
}

const mapDispatchToProps = {
  fetchNotes
}

const mapStateToProps = state => ({
  notes: state.notes.notes,
  isLoading: state.notes.isLoading,
  userStatus: state.auth.userStatus,
  userId: state.auth.userStatus,
  token: state.auth.token,
  tokenExpiration: state.auth.tokenExpiration
})

export default connect(mapStateToProps, mapDispatchToProps)(NotesPage)
