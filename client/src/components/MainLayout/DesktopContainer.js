import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
    Segment,
    Menu,
    Container,
    Visibility,
    Responsive,
    Button
} from 'semantic-ui-react'
import MainHeading from './MainHeading'

class DesktopContainer extends Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
  
      return (
        <Responsive {...Responsive.onlyComputer}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 400, padding: '.5em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  <Menu.Item as={ Link } to='/' active>
                    Home
                  </Menu.Item>
                  <Menu.Item as={ Link } to='/customers'>Customers</Menu.Item>
                  <Menu.Item as='a'>Company</Menu.Item>
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted={!fixed}>
                      Log in
                    </Button>
                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Container>
              </Menu>
              <MainHeading />
            </Segment>
          </Visibility>
  
          { children }
        </Responsive>
      )
    }
  }
  
DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default DesktopContainer
