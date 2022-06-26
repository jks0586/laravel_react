import React from "react";
import { connect } from "react-redux";
import Breadcrumb from "../../partials/Breadcrumb";
import CategoryService from "./../../../apis/Category";
// import {
//     listCategories,
//     setCategoryDefaults
// } from '../../../store/actions/CategoryActions'
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categories: [] };
    }

    componentDidMount() {
        const qry = `{categories{id,title,image,slug}}`;
        CategoryService.listAll(qry)
            .then((response) => {
                this.setState({ categories: response.data.data.categories });
                // console.log(response.data.data.categories);
                // alert('aaaaa');
            })
            .catch((error) => {
                console.log(error);
            });
        // this.props.setCategoryDefaults(),
        // this.props.listCategories(1)
    }

    render() {
        return (
            <Card>
                <Card.Header>Category list</Card.Header>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr key="head">
                                <th>#</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Slug</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.categories.map(function(object, i){
                            return (<tr key={i}>
                            <th>{i}</th>
                            <th>{object.title}</th>
                            <th><Card style={{ width: '50px' }}>
                            <Card.Img id='imagePreview' src={object.image} />
                        </Card></th>
                            <th>{object.slug}</th>
                            <th><FontAwesomeIcon icon={faPencil} /></th>
                        </tr>);
                        })}

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            // <div className="content-wrapper">
            //     <Card>
            //         <Card.Header>Categories List</Card.Header>

            //         <section className="content-header">
            //             <h1>Categories</h1>

            //         </section>

            //         <section className="content">
            //             <div className="row">
            //                 <div className="col-md-12">
            //                     <div className="box">
            //                         <div className="box-header">
            //                             <h3 className="box-title">
            //                                 All categories
            //                             </h3>
            //                             <Link
            //                                 to="/admin/categories/add"
            //                                 className="btn btn-primary pull-right"
            //                             >
            //                                 {" "}
            //                                 Add <i className="fa fa-plus"></i>
            //                             </Link>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         </section>
            //     </Card>
            // </div>
        );
    }
}

export default CategoryList;

// const mapStateToProps = (state, ownProps) => {
//     return {
//         categories: state.category
//     };
// };
// const mapDispatchToProps = (dispatch) => {
//     return {
//         listCategories: (page) => dispatch(listCategories(page)),
//         setCategoryDefaults: () => dispatch(setCategoryDefaults())
//     }
// };
// export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
