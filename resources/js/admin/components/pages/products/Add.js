import React from 'react'
import Card from 'react-bootstrap/Card'
import ProductForm from './Form';
class AddProduct extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <Card>
                <Card.Header>Create Product</Card.Header>
                <Card.Body>
                    <ProductForm />
                </Card.Body>
            </Card>
        )
    }
}
export default AddProduct
