import React from "react";
import { withRouter } from "react-router";
import Auth from "../../apis/Auth";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
class Login extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.remove("skin-green");
        document.body.classList.add("login-page");

        this.state = {
            email: "",
            password: "",
            error_message: null,
            errors: null,
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            error_message: null,
            errors: null,
        });

        if (this.state.email == "" || this.state.password == "") {
            this.setState({
                error_message: "Please enter login credentials",
            });
            return false;
        }

        Auth.login(
            { email: this.state.email, password: this.state.password },
            (response) => {
                console.log(response);
                // console.log(response.data);
                // console.log(response.data.data.user);
                if (response.data.data.user.is_admin == 1) {
                    for (var i in response.data.data.user) {
                        // alert('aaaaa');
                        localStorage.setItem(
                            "user." + i,
                            response.data.data.user[i]
                        );
                        
                    }
                    setTimeout(() => {
                        this.props.history.push("/admin/dashboard");
                    }, 500);
                } else {
                    localStorage.clear();
                    this.setState({
                        error_message: "Unauthrized",
                    });
                }
            },
            (err) => {
                // console.log(err.response, 'aaaaayyyyy');

                this.setState({
                    error_message: err.response.data.data.message,
                    errors: err.response.data.data.errors,
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <Card>
                    <Card.Header as="h5" className="text-center">
                        Login
                    </Card.Header>
                    <Card.Body>
                        {this.state.error_message ? (
                            <div className="alert alert-danger">
                                {this.state.error_message}
                            </div>
                        ) : null}

                        <Form
                            action="#"
                            method="post"
                            onSubmit={this.handleSubmit}
                        >
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={this.handleEmail}
                                    value={this.state.email}
                                />
                                {this.state.errors &&
                                this.state.errors.email ? (
                                    <div className="help-block">
                                        {this.state.errors.email[0]}
                                    </div>
                                ) : null}
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={this.handlePassword}
                                    value={this.state.password}
                                />
                                {this.state.errors &&
                                this.state.errors.password ? (
                                    <div className="help-block">
                                        {this.state.errors.password[0]}
                                    </div>
                                ) : null}
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default withRouter(Login);
