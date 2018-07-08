import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { 
    Container,
    Header,
    Button,
    Icon
} from 'semantic-ui-react'

const MainHeading = ({ mobile }) => (
    <Container text>
      <Header
        as='h1'
        content='Webtrek'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '1em',
        }}
      />
      <Header
        as='h2'
        content='Coding skills assessment for Front-end Developer role'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button as={Link} to='/customers' primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button>
    </Container>
)
  
MainHeading.propTypes = {
    mobile: PropTypes.bool,
}

export default MainHeading