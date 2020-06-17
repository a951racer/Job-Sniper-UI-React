import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux'

import { logout } from '../Redux/actions/auth'
import './MainNavigator.css';


class MainNavigator extends Component {
  state = {
    redirect: false,
    redirectTo: null
  }

  handleClick = (match, page) => {
    if (match) this.setState({redirect: true, redirectTo: page})
  }

  isMatch = (path) => {
    return useRouteMatch({
      path,
      exact: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirectTo} />;
    }
    return (
      <Router>
        <div className="menu-list">
          <MenuLink to="/opportunities" label="Opportunities" activeOnlyWhenExact={true} icon="money-bill" clickHandler={() => this.handleClick(true, '/opportunities')}/>
          <MenuLink to="/contacts" label="Contacts" activeOnlyWhenExact={true}  icon="users" clickHandler={() => this.handleClick(true, '/contacts')}/>
          <MenuLink to="/activities" label="Activities" activeOnlyWhenExact={true}  icon="envelope" clickHandler={() => this.handleClick(true, '/activities')}/>
          <MenuLink to="/notes" label="Notes" activeOnlyWhenExact={true}  icon="file" clickHandler={() => this.handleClick(true, '/notes')}/>
          <MenuLink to="/profile" label="Profile" activeOnlyWhenExact={true}  icon="user-edit" clickHandler={() => this.handleClick(true, '/profile')}/>
          <div className="menu-item logout" onClick={this.props.logout}>
            <i className="pi pi-power-off"></i>&nbsp;<span className="menu-item-text">Logout</span>
          </div>
        </div>
      </Router>
    )
  }
}

function MenuLink({ label, to, activeOnlyWhenExact, icon, clickHandler }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div className={match ? "menu-item-active" : "menu-item"} onClick={clickHandler}>
      <i className={"pi pi-"+icon}></i>&nbsp;<span className="menu-item-text">{label}</span>
    </div>
  );
}

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(MainNavigator)