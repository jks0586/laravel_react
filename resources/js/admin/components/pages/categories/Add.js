import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../partials/Breadcrumb'
import Card from 'react-bootstrap/Card'

import CategoryForm from './CategoryForm'
class CategoryAdd extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount () {
    }

    handleChange (e) {
        e.preventDefault()
        this.props.handleCategoryTitle(e.target.value)
    }

    handleSubmit (e) {
        e.preventDefault()

    }
    render () {
        return (
            <Card>
                <Card.Header>Create Category</Card.Header>
                <Card.Body>
                    <CategoryForm />
                </Card.Body>
            </Card>
        )
    }
}
export default CategoryAdd
