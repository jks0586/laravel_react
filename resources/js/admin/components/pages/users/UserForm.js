import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import UserService from "./../../../apis/Users";
import { request, gql } from 'graphql-request'
import { withRouter } from 'react-router-dom';
import validator from 'validator'
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
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.userValidate = this.userValidate.bind(this)
    }

    handleNameChange (e) {
        this.setState({ name: e.target.value })
        delete this.state.formErrors['name'];
        e.preventDefault()
    }


    handleEmailChange (e) {
        let fieldValidationErrors = this.state.formErrors;
        this.setState({ email: e.target.value })
        delete this.state.formErrors['email'];
        const email= e.target.value;
        if (validator.isEmail(email)) {
        } else {
          fieldValidationErrors['email'] =
          email.charAt(0).toUpperCase() + email.slice(1) + ' is Not valid'
        }
        this.setState({ formErrors: fieldValidationErrors })
        e.preventDefault()
    }


    handlePasswordChange (e) {
        this.setState({ password: e.target.value })
        delete this.state.formErrors['password'];
        e.preventDefault()
    }

    handleIsadminChange(e){
        e.preventDefault();
        this.setState({ is_admin: e.target.value })
        // alert(e.target.value);
    }

    userValidate(e) {
        // console.log(this.state);
        const {id} = this.props.match.params;
        let fieldValidationErrors = this.state.formErrors
        Object.keys(this.state).forEach((value, index) => {
            switch(value){
            case 'name':
                if (
                    value == 'name' &&
                    (this.state[value] == '' || this.state[value] == undefined)
                ) {
                    fieldValidationErrors[value] =
                        value.charAt(0).toUpperCase() + value.slice(1) + ' Field could not be empty'
                }
            break;


            case 'email':
                if (
                    value == 'email' &&
                    (this.state[value] == '' || this.state[value] == undefined)
                ) {
                    fieldValidationErrors[value] =
                    value.charAt(0).toUpperCase() + value.slice(1) + ' Field could not be empty'
                }
                else {
                    let email=this.state[value];
                    // console.log(email,'aaaaauuuuu');
                    // if (validator.isEmail(email)) {
                    //     fieldValidationErrors[value] = '';
                    // } else {
                    //     fieldValidationErrors[value] = value.charAt(0).toUpperCase() + value.slice(1) + ' is Not valid';
                    // }
                }
            break;
            case 'password':
                if (
                    value == 'password' && ( id=='' || id==undefined) &&
                    (this.state[value] == '' || this.state[value] == undefined)
                ) {
                    fieldValidationErrors[value] =
                    value.charAt(0).toUpperCase() + value.slice(1) + ' Field could not be empty'
                }
            break;
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
        e.preventDefault();
        const {id} = this.props.match.params;
        if (this.userValidate(e)) {
            const postdata = {}
             Object.keys(this.state).forEach((value, index) => {
                postdata[value] = this.state[value]
            })
            if(id){
                // if(postdata.password!='' && postdata.password!=undefined){
                //     password=postdata.password;
                // } else {
                //     password=postdata.password;
                // }

                const catpost = {
                    query: `mutation updateUser($id: Int!,$name: String!, $email: String!,$password: String,  $is_admin: Int!) {
                        updateUser(id:$id,name: $name,email: $email,password:$password,is_admin: $is_admin){
                            id,
                            name,
                            email,
                            password,
                            is_admin
                        }
                    }`,
                    variables: {
                        id: parseInt(id),
                        name: postdata.name,
                        email: postdata.email,
                        password: postdata.password,
                        is_admin: parseInt(postdata.is_admin)
                    }
                }
                
                UserService.add(catpost).then((response)=>{
                    console.log(response);
                }).catch((error)=>{
                    console.log(error);
                })

            } else {

                const catpost = {
                    query: `mutation createUser($name: String!, $email: String!, $password: String!, $is_admin: Int!) {
                        createUser(name: $name,email: $email,password: $password,is_admin: $is_admin){
                            name,
                            email,
                            password,
                            is_admin
                        }
                    }`,
                    variables: {
                        name: postdata.name,
                        email: postdata.email,
                        password: postdata.password,
                        is_admin: parseInt(postdata.is_admin)
                    }
                }
                
                UserService.add(catpost).then((response)=>{
                    console.log(response);
                }).catch((error)=>{
                    console.log(error);
                })
                
            }
        }

    }


    componentDidMount(){
        const {id} = this.props.match.params;
        if(id){
        const uid=parseInt(id);
        const catpost = {
            query: `query getUser($id:Int!){
                    user(id:$id){
                        id,
                        name,
                        email,
                        is_admin
                      }
                }
            `,
            variables: {
              id: uid,
            }
          }
        // console.log(catpost);
        // alert('aaaayyyyy');
        UserService.get(catpost).then((response)=>{
            
            console.log(response);
            let setdata={
                email:response.data.data.user.email,
                name:response.data.data.user.name,
                is_admin:response.data.data.user.is_admin
            }
            this.setState(setdata);
        }).catch((error)=>{
            // alert('yyyyyy');
            console.log(error);
        })
        }
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
                            value={this.state.name}
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
                            value={this.state.email}
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
                        type="checkbox"
                        name="is_admin"
                        label='Is Admin'
                        value='1'
                        id={`disabled-default-checkbox`}
                        onChange={this.handleIsadminChange}
                    />
                    </Form.Group>

                    <Button variant='primary' type='submit'>Save</Button>
                </Form>
            </>
        )
    }
}

export default withRouter(UserForm)
