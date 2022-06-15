import React from 'react'
import { withRouter } from 'react-router'
import Auth from '../../apis/Auth'

class Login extends React.Component {
    constructor (props) {
        super(props)
        document.body.classList.remove('skin-green')
        document.body.classList.add('login-page')

        this.state = {
            email: '',
            password: '',
            error_message: null,
            errors: null
        }

        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmail (e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePassword (e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit (e) {
        e.preventDefault()
        this.setState({
            error_message: null,
            errors: null
        })

        if (this.state.email == '' || this.state.password == '') {
            this.setState({
                error_message: 'Please enter login credentials'
            })
            return false
        }

        Auth.login({ email: this.state.email, password: this.state.password },
            response => {
                // console.log(response);
                // console.log(response.data);
                // console.log(response.data.data.user);
                if (response.data.data.user.is_admin == 1) {
                    for (var i in response.data.data.user) {
                        alert('aaaaa');
                        localStorage.setItem('user.' + i, response.data.data.user[i])
                        setTimeout(() => {
                            this.props.history.push('/')
                        }, 500)
                    }
                } else {
                    localStorage.clear()
                    this.setState({
                        error_message: 'Unauthrized'
                    })
                }
            },
            (err) => {

                console.log(err.response,'aaaaayyyyy');

                this.setState({
                    error_message: err.response.data.data.message,
                    errors: err.response.data.data.errors
                })
            }
        );
    }

    render () {
        return (
            <div className='container'>
                <div className='login-box'>
                    <div className='login-logo'>
                        <b>Blog</b>RL
                    </div>
                    <div className='login-box-body'>
                        <p className='login-box-msg'>
                            Sign in to start your session
                        </p>
                        {this.state.error_message ? (
                            <div className='alert alert-danger'>
                                {this.state.error_message}
                            </div>
                        ) : null}

                        <form
                            action='#'
                            method='post'
                            onSubmit={this.handleSubmit}
                        >
                            <div
                                className={`form-group has-feedback ${
                                    this.state.errors && this.state.errors.email
                                        ? 'has-error'
                                        : ''
                                }`}
                            >
                                <input
                                    type='email'
                                    name='email'
                                    className='form-control'
                                    placeholder='Email'
                                    onChange={this.handleEmail}
                                    value={this.state.email}
                                />
                                <span className='glyphicon glyphicon-envelope form-control-feedback'></span>
                                {this.state.errors &&
                                this.state.errors.email ? (
                                    <div className='help-block'>
                                        {this.state.errors.email[0]}
                                    </div>
                                ) : null}
                            </div>
                            <div
                                className={`form-group has-feedback ${
                                    this.state.errors &&
                                    this.state.errors.password
                                        ? 'has-error'
                                        : ''
                                }`}
                            >
                                <input
                                    type='password'
                                    name='password'
                                    className='form-control'
                                    placeholder='Password'
                                    onChange={this.handlePassword}
                                    value={this.state.password}
                                />
                                <span className='glyphicon glyphicon-lock form-control-feedback'></span>
                                {this.state.errors &&
                                this.state.errors.password ? (
                                    <div className='help-block'>
                                        {this.state.errors.password[0]}
                                    </div>
                                ) : null}
                            </div>
                            <div className='row'>
                                <div className='col-xs-4'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary btn-block btn-flat'
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)
