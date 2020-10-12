import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import 'primereact/resources/themes/nova-colored/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import AuthPage from './Pages/Auth'
import OpportunitiesPage from './Pages/Opportunities'
import ContactsPage from './Pages/Contacts'
import ActivitiesPage from './Pages/Activities'
import NotesPage from './Pages/Notes'
import ProfilePage from './Pages/Profile'
import LogoutPage from './Pages/Logout'
import './App.css'
import OpportunityDetail from './Pages/OpportunityDetail';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
            <Switch>
              {this.props.token && <Redirect from="/auth" to="/opportunities" exact />}
              {!this.props.token && <Route path="/auth" component={AuthPage} />}
              {!this.props.token && <Redirect to="/auth" exact />}
              {<Route path="/opportunities" component={OpportunitiesPage} />}
              {<Route path="/opportunityDetail/:opportunityId" component={OpportunityDetail} />}
              {<Route path="/contacts" component={ContactsPage} />}
              {<Route path="/activities" component={ActivitiesPage} />}
              {<Route path="/notes" component={NotesPage} />}
              {<Route path="/profile" component={ProfilePage} />}
              {<Route path="/logout" component={LogoutPage} />}
            </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  userStatus: state.auth.userStatus,
  userId: state.auth.userStatus,
  token: state.auth.token,
  tokenExpiration: state.auth.tokenExpiration
})

export default connect(mapStateToProps)(App)
