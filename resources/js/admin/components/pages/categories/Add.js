import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../partials/Breadcrumb';

import {
    addCategory,
    setCategoryDefaults,
    handleCategoryTitle
} from '../../../store/actions/CategoryActions';

import CategoryForm from './CategoryForm';
class CategoryAdd extends React.Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        this.props.setCategoryDefaults();
    }

    handleChange (e) {
        e.preventDefault();
        alert('aaaa');
        this.props.handleCategoryTitle(e.target.value);
    }

    handleSubmit (e) {
        e.preventDefault();
        // console.log(this);
        let self = this;
        console.log(this.props.categories);

        this.props.addCategory(
            this.props.categories.category.title,
            function () {
                self.props.handleTitleChange('');
                setTimeout(() => {
                    self.props.history.psuh('/admin/categories');
                }, 2000);
            }
        )
    }
    render () {
        return (
            <div className='content-wrapper'>
                <section className='content-header'>
                    <h1>Add category</h1>
                    <Breadcrumb />
                </section>

                <section className='content'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='box box-warning'>
                                <div className='box-header with-border'>
                                    <h3 className='box-title'>Add category</h3>
                                    <Link
                                        to='/admin/categories'
                                        className='btn btn-warning btn-sm'
                                    >
                                        <i className='fa fa-arrow-left'></i>{' '}
                                        Return back
                                    </Link>
                                </div>

                                <form
                                    role='form'
                                    method='post'
                                    onSubmit={this.handleSubmit}
                                >
                                    <div className='box-body'>
                                        <CategoryForm categories={this.props.categories} />
                                    </div>
                                    <div className='box-footer'>
                                        <button
                                            type='submit'
                                            className='btn btn-success'
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.category
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleTitleChange: title => dispatch(handleCategoryTitle(title)),
        addCategory: (title, cb) => dispatch(addCategory(title, cb)),
        setCategoryDefaults: () => dispatch(setCategoryDefaults())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd)
