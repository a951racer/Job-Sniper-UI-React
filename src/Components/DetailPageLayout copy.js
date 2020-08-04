import React, { Component } from 'react'
import MainNavigator from '../Components/MainNavigator'
import { Container, Row, Col } from 'reactstrap'
import moment from 'moment'

import './PageLayout.css'

class PageLayout extends Component {

  render() {
    return (
      <div id="main">
        <div className="container">
          <div className="content-area-wrap">
            <div className="LeftNav__wrapper">
              <div className="LeftNav">
                <div className="ProfileDropDown">
                  <div className="corner-branding">
                    Job Sniper!
                  </div>
                </div>
                <div className="Menu">
                  Navigator goes here
                </div>
              </div>
            </div>
            <div className="content-area">
              <div className="top-shadow">
                Title Bar
              </div>
              <div className="app-content">
                <div className="page-lead">
                  <div className="lead-sidebar">
                    Sidebar
                  </div>
                  <div className="activity-side">
                    Good stuff here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageLayout
