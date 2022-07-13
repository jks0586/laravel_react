import React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from '../../partials/Breadcrumb';
import UserService from './../../../apis/Users';
import ProductService from './../../../apis/Product';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Oval } from  'react-loader-spinner';
import Loading from "react-fullscreen-loading";
class Products extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            products: [],
            isLoading:false,
         }
        // this.titleonChange = this.titleonChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e){
       e.preventDefault();
    const id=parseInt(e.target.parentElement.dataset.key);
      const catpost = {
        query: `mutation deleteProduct($id:Int!) {
            deleteProduct(id:$id)
        }`,
        variables: {
          id:id
        }
      }


    ProdcutService.delete(catpost).then((response)=>{
        console.log(response);
    }).catch((error)=>{
        console.log(error);
    })

    }

    componentDidMount () {
        this.setState({'isLoading':true});
        // const qry = `{users{id,name,email,avtar,is_admin,avtarimage}}`
        
        const qry = {
            
            query:`query FetchProducts {
            products {
                id
                name
                slug
                description
                price
                sale_price
                sku
                quantity
                in_stock
                is_taxable
                image
                category_id
                status
                views
                meta_title
                meta_keyword
                meta_description
                views
            }
        }`
    }

        console.log(qry);
        ProductService.listAll(qry)
            .then(response => {
                console.log(response.data.data);
                this.setState({ products: response.data.data.products })
                this.setState({'isLoading':false});
            })
            .catch(error => {
                console.log(error);
                this.setState({'isLoading':false});
            })
    }

    render () {
        return (
            <>
            <Loading
                    loading={this.state.isLoading}
                    background="#00000000"
                    loaderColor="#ffffff"
                />
           
            <Card>
                <Card.Header>Users list</Card.Header>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr key='head'>
                                <th>#</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Image</th>
                                
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map((object, i) => {
                                return (
                                    <tr key={i}>
                                        <th>{i}</th>
                                        <th>{object.name}</th>
                                        <th>
                                        {object.slug}
                                        </th>
                                        <th>
                                        <img src={object.image} width="50" height="50" />
                                        </th>
                                        
                                        <th>
                                        <Link to={`/admin/products/edit/${object.id}`}><FontAwesomeIcon icon={faPencil} /></Link> | <FontAwesomeIcon icon={faTrash} data-key={object.id}  onClick={this.handleDelete} />
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            </>
        )
    }
}

export default Products
