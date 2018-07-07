import React from 'react'
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react'
import faker from 'faker'

class CustomerItem extends React.Component {
    render(){
        const { customer } = this.props;
        
        return(
            <Card>
                <Image src={faker.internet.avatar()} />
                <Card.Content>
                    <Card.Header>{customer.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{customer.birthday}</span>
                    </Card.Meta>
                    <Card.Description>{customer.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {customer.value}
                </a>
                </Card.Content>
            </Card>
        )
    }
}

CustomerItem.propTypes = {
    customer: PropTypes.object.isRequired
}

export default CustomerItem