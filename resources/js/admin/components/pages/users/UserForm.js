import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import _ from "lodash";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UserService from "./../../../apis/users";
import { request, gql } from 'graphql-request'
import { withRouter } from 'react-router-dom';

class UserForm extends React.Component {
    constructor (props) {
        super(props)
        // console.log(this.props.categories.category.title);
        console.log(this.props);
        this.state = {
            name: '',
            email: '',
            password: '',
            is_admin: '',
            formErrors: {},
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleIsadminChange = this.handleIsadminChange.bind(this)
        // this.handleSlugChange = this.handleSlugChange.bind(this)
        // this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.categoryValidate = this.categoryValidate.bind(this)
    }

    handleNameChange (e) {
        this.setState({ name: e.target.value })
        delete this.state.formErrors['name'];
        e.preventDefault()
    }


    handleEmailChange (e) {
        this.setState({ email: e.target.value })
        delete this.state.formErrors['email'];
        e.preventDefault()
    }


    handlePasswordChange (e) {
        this.setState({ password: e.target.value })
        delete this.state.formErrors['password'];
        e.preventDefault()
    }

    categoryValidate (e) {

        let fieldValidationErrors = this.state.formErrors
        Object.keys(this.state).forEach((value, index) => {
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
            // CategoryService.add(catpost).then((response)=>{
            //     // console.log(response);
            // }).catch((error)=>{
            //     console.log(error);
            // })
            //
        }

        // console.log(postdata);
    }


    componentDidMount(){
        const {id} = this.props.match.params;
        // console.log(id);
        const uid=parseInt(id);
        const catpost = {
            query: `getCategory($id:Int!){
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
        // CategoryService.get(catpost).then((response)=>{
        //     console.log(response);
        // }).catch((error)=>{
        //     console.log(error);
        // })
    }

    render () {
        // const { id } = this.props.match.params;
        return (
            // const { userName } = this.props.match.params;
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className='mb-3' controlId='formName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Name'
                            name='name'
                            value={this.state.value}
                            onChange={this.handleNameChange}
                        />
                        <Alert
                            show={this.state.formErrors['name'] ? true : false}
                            variant='danger'
                        >
                            {this.state.formErrors['name']}
                        </Alert>
                        <Form.Text className='text-muted'>
                            Please fill user name
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            value={this.state.value}
                            onChange={this.handleEmailChange}
                        />
                        <Alert
                            show={this.state.formErrors['email'] ? true : false}
                            variant='danger'
                        >
                            {this.state.formErrors['email']}
                        </Alert>
                        <Form.Text className='text-muted'>
                            Please fill user email
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            name='password'
                            value={this.state.value}
                            onChange={this.handlePasswordChange}
                        />
                        <Alert
                            show={this.state.formErrors['password'] ? true : false}
                            variant='danger'
                        >
                            {this.state.formErrors['password']}
                        </Alert>
                        <Form.Text className='text-muted'>
                            Please fill User password
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formIsadmin'>
                    <Form.Check
                        disabled
                        type="checkbox"
                        name="is_admin"
                        label='Is Admin'
                        id={`disabled-default-checkbox`}
                    />
                    </Form.Group>

                    <Button variant='primary' type='submit'>Save</Button>
                </Form>
            </>
        )
    }
}

export default withRouter(UserForm)
