import React from 'react'
import Card from 'react-bootstrap/Card'
import UserForm from './Form';

class EditProduct extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <Card>
                <Card.Header>Edit User</Card.Header>
                <Card.Body>
                    <UserForm />
                </Card.Body>
            </Card>
        )
    }
}
export default EditProduct
