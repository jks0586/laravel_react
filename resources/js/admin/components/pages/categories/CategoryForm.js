import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import _ from "lodash";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CategoryService from "./../../../apis/Category";
import { request, gql } from 'graphql-request'
import axios from 'axios'
import Api from '../../../apis/api'
import { withRouter } from 'react-router-dom';

class CategoryForm extends React.Component {
    constructor (props) {
        super(props)
        // console.log(this.props.categories.category.title);
        console.log(this.props);
        this.state = {
            title: '',
            description: '',
            image: '',
            slug: '',
            imagePreview: '',
            imagePreviewUrl: '',
            formErrors: {},
        }

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSlugChange = this.handleSlugChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.categoryValidate = this.categoryValidate.bind(this)
    }

    handleTitleChange (e) {
        this.setState({ title: e.target.value })
        delete this.state.formErrors['title'];
        // this.setState({formErrors:{}});
        // console.log(this.state);
        e.preventDefault()
    }
    handleImageChange (e) {
        // alert("aaaaaaaa");
        // console.log(e.target.files[0]);
        this.setState({ image: e.target.files[0] })
        this.previewFile(e.target.files[0])
        delete this.state.formErrors['image'];
        // this.setState({formErrors:{}});
        setTimeout(function () {
            let imgset = document.getElementById('imagePreview');
            // this.setState({title : imgset.getAttribute('src')})
        }, 1000)

        e.preventDefault()
    }
    handleSlugChange (e) {
        this.setState({ slug: e.target.value })

        delete this.state.formErrors['slug'];

        // this.setState({formErrors:{}});
        e.preventDefault()
    }
    handleDescriptionChange (e) {
        this.setState({ description: e.target.value })

        delete this.state.formErrors['description'];

        // this.setState({formErrors:{}});
        e.preventDefault()
    }
    previewFile (file) {
        const reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file)
        }

        reader.onloadend = function (e) {
            let imgset = document.getElementById('imagePreview')
            imgset.setAttribute('src', reader.result)
            imgset.setAttribute('width', 50)
            imgset.setAttribute('height', 50)
            //
            this.setState({ imagePreview: reader.result })
          }.bind(this);


    }
    categoryValidate (e) {
        // console.log('aaaaaayyyyyyy', this.state)
        // const formErrors={};
        let fieldValidationErrors = this.state.formErrors
        Object.keys(this.state).forEach((value, index) => {
            // console.log(value);
            // console.log(fieldValidationErrors.value);

            if (
                value == 'title' &&
                (this.state[value] == '' || this.state[value] == undefined)
            ) {
                fieldValidationErrors[value] =
                    value + ' Field could not be empty'
            }
            if (
                value == 'description' &&
                (this.state[value] == '' || this.state[value] == undefined)
            ) {
                fieldValidationErrors[value] =
                    value + ' Field could not be empty'
            }
            if (
                value == 'image' &&
                (this.state[value] == '' || this.state[value] == undefined)
            ) {
                fieldValidationErrors[value] =
                    value + ' Field could not be empty'
            }
            if (
                value == 'slug' &&
                (this.state[value] == '' || this.state[value] == undefined)
            ) {
                fieldValidationErrors[value] =
                    value + ' Field could not be empty'
            }

            // console.log(value,this.state[value]);
        })

        // console.log(fieldValidationErrors);

        this.setState({ formErrors: fieldValidationErrors })

        // console.log(this.state.formErrors.length)

        if (_.isEmpty(this.state.formErrors)) {

            return true;

        } else {

            return false;
        }

        // console.log(formErrors);
    }

    handleSubmit (e) {
        e.preventDefault()
        // this.setState({formErrors:{}});
        // console.log("yyyyyy");
        if (this.categoryValidate(e)) {
            const postdata = {}

            // console.log(this.state);

            Object.keys(this.state).forEach((value, index) => {
                postdata[value] = this.state[value]
                // console.log(value,this.state.value);
            })
            // console.log(postdata);

            const catpost = {
                query: `mutation createCategory($title: String!, $description: String!, $image: String!, $slug: String!) {
                    createCategory(title: $title,description: $description,image: $image,slug: $slug,){
                    title,
                    description,
                    image,
                    slug
                  }
                }`,
                variables: {
                  title: postdata.title,
                  description: postdata.description,
                  image: postdata.imagePreview,
                  slug: postdata.slug
                }
              }
            //   console.log(catpost);
            CategoryService.add(catpost).then((response)=>{
                // console.log(response);
            }).catch((error)=>{
                console.log(error);
            })
            //
        }

        // console.log(postdata);
    }


    componentDidMount(){
        const {id} = this.props.match.params;
        // console.log(id);
        const uid=parseInt(id);
        const catpost = {
            query: `query getCategory($id:Int!){
                    category(id:$id){
                        title,
                        description,
                        image
                        slug
                      }
                }
            `,
            variables: {
              id: uid,
            }
          }
        //   console.log(catpost);
        CategoryService.get(catpost).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    }

    render () {
        // const { id } = this.props.match.params;
        return (
            // const { userName } = this.props.match.params;
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className='mb-3' controlId='formTitle'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Title'
                            name='title'
                            value={this.state.value}
                            onChange={this.handleTitleChange}
                        />
                        <Alert
                            show={this.state.formErrors['title'] ? true : false}
                            variant='danger'
                        >
                            {this.state.formErrors['title']}
                        </Alert>
                        <Form.Text className='text-muted'>
                            Please fill category title
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formDescription'>
                        <Form.Label>Description</Form.Label>
                        <CKEditor
                            editor={ClassicEditor}
                            data='<p>Hello from CKEditor 5!</p>'
                            onReady={editor => {
                                const data = editor.getData()
                                this.setState({ description: data })
                                // You can store the "editor" and use when it is needed.
                                // console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData()
                                this.setState({ description: data })
                                // console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                const data = editor.getData()
                                this.setState({ description: data })
                                // console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                                const data = editor.getData()
                                this.setState({ description: data })
                                // console.log("Focus.", editor);
                            }}
                        />
                        <Alert
                            show={
                                this.state.formErrors['description']
                                    ? true
                                    : false
                            }
                            variant='danger'
                        >
                            {this.state.formErrors['description']}
                        </Alert>
                        <Form.Text className='text-muted'>
                            Please Fill Category Description
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formImage'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='file'
                            placeholder='Select Image'
                            name='image'
                            onChange={this.handleImageChange}
                        />
                        <Card style={{ width: '50px' }}>
                            <Card.Img id='imagePreview' src='' />
                        </Card>
                        <Alert
                            show={this.state.formErrors['image'] ? true : false}
                            variant='danger'
                        >
                            {this.state.formErrors['image']}
                        </Alert>
                        <div className='clearfix'></div>

                        <Form.Text className='text-muted'>
                            Please select you image
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formSlug'>
                        <Form.Label>Slug</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Slug'
                            name='slug'
                            onChange={this.handleSlugChange}
                        />
                        <Alert
                            show={this.state.formErrors['slug'] ? true : false}
                            variant='danger'
                        >
                            {this.state.formErrors['slug']}
                        </Alert>
                        <Form.Text className='text-muted'>
                            Please fill category slug
                        </Form.Text>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </>
        )
    }
}

export default withRouter(CategoryForm)
