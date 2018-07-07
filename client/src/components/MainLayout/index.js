import React, { Component } from 'react'
import { 
    Container,
    Segment
} from 'semantic-ui-react'
import ResponsiveContainer from './ResponsiveContainer'

class MainLayout extends Component {
    render() {
        return (
            <ResponsiveContainer>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Container text>
                      { this.props.children }
                    </Container>
                </Segment>
            </ResponsiveContainer>
        )
    }
}

export default MainLayout;