import React from 'react'
import Card from 'react-bootstrap/Card'
import UserForm from './UserForm';
class AddUser extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <Card>
                <Card.Header>Create User</Card.Header>
                <Card.Body>
                    <UserForm />
                </Card.Body>
            </Card>
        )
    }
}
export default AddUser
