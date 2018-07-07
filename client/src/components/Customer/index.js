import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import faker from 'faker'

const Customer = ({ customer }) => (
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

export default Customer