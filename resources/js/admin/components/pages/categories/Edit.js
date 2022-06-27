import React from "react";
import Breadcrumb from "../../partials/Breadcrumb";
import Card from 'react-bootstrap/Card'
import CategoryForm from './CategoryForm'
class CategoryEdit extends React.Component
{
     render(){
        return(
            <Card>
                <Card.Header>Edit Category</Card.Header>
                <Card.Body>
                    <CategoryForm />
                </Card.Body>
            </Card>
        )
    }
}


export default CategoryEdit;
