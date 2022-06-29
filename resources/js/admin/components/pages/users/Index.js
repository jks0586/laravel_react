import React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from '../../partials/Breadcrumb';
import UserService from './../../../apis/Users';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Audio } from  'react-loader-spinner';
class ListUsers extends React.Component {
    constructor (props) {
        super(props)
        this.state = { users: [] }
        // this.titleonChange = this.titleonChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e){
       e.preventDefault();
    const id=parseInt(e.target.parentElement.dataset.key);
      const catpost = {
        query: `mutation deleteUser($id:Int!) {
            deleteUser(id:$id)
        }`,
        variables: {
          id:id
        }
      }


    UserService.delete(catpost).then((response)=>{
        console.log(response);
    }).catch((error)=>{
        console.log(error);
    })

    }

    componentDidMount () {
        const qry = `{users{id,name,email,is_admin}}`
        UserService.listAll(qry)
            .then(response => {
                this.setState({ users: response.data.data.users })

            })
            .catch(error => {
                console.log(error)
            })
        // this.props.setCategoryDefaults(),
        // this.props.listCategories(1)

    }

    render () {
        return (
            <Card>
                <Card.Header>Users list</Card.Header>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr key='head'>
                                <th>#</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Slug</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((object, i) => {
                                return (
                                    <tr key={i}>
                                        <th>{i}</th>
                                        <th>{object.name}</th>
                                        <th>
                                        {object.email}
                                        </th>
                                        <th>{object.is_admin}</th>
                                        <th>
                                        <Link to={`/admin/users/edit/${object.id}`}><FontAwesomeIcon icon={faPencil} /></Link> | <FontAwesomeIcon icon={faTrash} data-key={object.id}  onClick={this.handleDelete} />
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}

export default ListUsers
