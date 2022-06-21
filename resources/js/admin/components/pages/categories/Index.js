import React from 'react'
import { connect } from 'react-redux';
import Breadcrumb from '../../partials/Breadcrumb'
// import {
//     listCategories,
//     setCategoryDefaults
// } from '../../../store/actions/CategoryActions'
import {Card} from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
class CategoryList extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount () {
        // this.props.setCategoryDefaults(),
        // this.props.listCategories(1)
    }

    render () {
        return (
            <div className='content-wrapper'>
                <Card>
                {/* <Card.Header>Featured</Card.Header> */}
                <section className='content-header'>
                    <h1>Categories</h1>
                    {/* <Breadcrumb /> */}
                </section>

                <section className='content'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='box'>
                                <div className='box-header'>
                                    <h3 className='box-title'>
                                        All categories
                                    </h3>
                                    <Link
                                        to='/admin/categories/add'
                                        className='btn btn-primary pull-right'
                                    >
                                        Add <i className='fa fa-plus'></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </Card>
            </div>
        )
    }
}

export default CategoryList

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
