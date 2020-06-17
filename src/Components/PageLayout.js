import React, { Component } from 'react'
import MainNavigator from '../Components/MainNavigator'

import './PageLayout.scss'

class PageLayout extends Component {

  render() {
    return (
      <div id="main">
        <div className="container">
          <div className="content-area-wrap">
            <div className="LeftNav">
                <div className="corner-branding">
                  <span className="brand">Job Sniper!</span>
                </div>
              <div className="nav-container">
                <MainNavigator />
              </div>
            </div>
            <div className="content-area">
              <div className="TitleBar">
                <div className="page-title">
                  {this.props.title}
                </div>
              </div>
                <div className="activity-side">
                  {this.props.children}
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageLayout
