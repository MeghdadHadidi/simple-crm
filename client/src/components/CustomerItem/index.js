import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, Menu, Icon, Image, Button, Popup } from 'semantic-ui-react'
import faker from 'faker'

class CustomerItem extends React.Component {
    render(){
        const { customer } = this.props;
        
        return(
            <Card>
                <Image as={Link} to={`/customers/detail/${customer.customerID}`} src={faker.internet.avatar()} />
                <Card.Content>
                    <Card.Header as={Link} to={`/customers/detail/${customer.customerID}`}>{customer.name.first} {customer.name.last}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{customer.gender}</span>
                    </Card.Meta>
                    <Card.Description>{customer.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {customer.birthday}
                </a>
                <Menu.Item style={{float: 'right'}} as={Link} to={`/customers/edit/${customer.customerID}`} >
                    <Popup
                        trigger={<Icon name='edit' />}
                        content={`Edit ${customer.name.first}`}
                        />
                </Menu.Item>
                <Menu.Item as={Link} style={{float: 'right'}} to={`/customers/delete/${customer.customerID}`}>
                    <Popup
                        trigger={<Icon color='red' name='trash' />}
                        content={`Delete ${customer.name.first}`}
                        />  
                </Menu.Item>
                </Card.Content>
            </Card>
        )
    }
}

CustomerItem.propTypes = {
    customer: PropTypes.object.isRequired
}

export default CustomerItem