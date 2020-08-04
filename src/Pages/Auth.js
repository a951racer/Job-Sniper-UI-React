import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import  { Button } from 'primereact/button';

import { login } from '../Redux/actions/auth'
import './Auth.css'
import logo from '../Assets/logo.png'

class AuthPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  submitHandler = async event => {
    event.preventDefault()
    const email = this.state.username
    const password = this.state.password

    if (email.trim().length === 0 || password.trim().length === 0) {
      return
    }

    await this.props.login(email, password)
  }

  render() {
    const footer = <span style={{textAlign: 'center'}}><h4><i>The Job Sniper</i></h4></span>

    return (
      <>
        <div className="login-container">
          <div className="login-header"></div>
          <div className="login-main">
              <Card>
                <div className="login-form-wrapper">
                  <div className="login-form-logo">
                    <Card footer={footer}>
                      <img src={logo} alt="The Job Sniper"/>
                    </Card>
                  </div>
                  <div className="login-form">
                    <div style={{fontSize: '1.5em'}}>Username:</div>
                    <div>
                      <InputText
                        id="username"
                        value={this.state.username}
                        onChange={(e) => this.setState({username: e.target.value})}
                      />
                    </div>
                    <div style={{marginBottom: '1em'}}>
                    <div style={{fontSize: '1.5em'}}>Password:</div>
                      <Password value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                    </div>
                    <div>
                      <Button label="Login" icon="pi pi-sign-in" iconPos="right" onClick={this.submitHandler}/>
                    </div>
                  </div>
                </div>
              </Card>
          </div>
          <div className="aside aside-1"></div>
          <div className="aside aside-2"></div>
          </div>
      </>
    )
  }
}

const mapDispatchToProps = {
  login
}

const mapStateToProps = state => ({
  userStatus: state.auth.userStatus,
  userId: state.auth.userStatus,
  token: state.auth.token,
  tokenExpiration: state.auth.tokenExpiration
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
