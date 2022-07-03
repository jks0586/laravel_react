import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { withRouter } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faUsers,
    faGripHorizontal,
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = (props) => {
    // console.log(props)
    // return props.location.pathname != '/admin/login'?(
    const [postopen, setPostopenpen] = useState(false);
    const [categoryopen, setCategoryopen] = useState(false);
    const [useropen, setUseropen] = useState(false);
    const [productopen, setProductopen] = useState(false);

    return (
        <Navbar expand={true}>
            <Container fluid>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Nav.Link href="/admin/dahboard">    
                            <FontAwesomeIcon icon={faGripHorizontal} />
                            Dashbaord
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            onClick={() => setUseropen(!useropen)}
                            aria-controls="user"
                            aria-expanded={useropen}
                        >
                        <FontAwesomeIcon icon={faUsers} /> Users
                        </Nav.Link>
                        <Collapse in={useropen}>
                            <div id="user">
                                <Nav.Link href="/admin/users/add">Add</Nav.Link>
                                <Nav.Link href="/admin/users">Users</Nav.Link>
                            </div>
                        </Collapse>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            onClick={() => setCategoryopen(!categoryopen)}
                            aria-controls="category"
                            aria-expanded={categoryopen}
                        >
                            <FontAwesomeIcon icon={faList} /> Categories
                        </Nav.Link>
                        <Collapse in={categoryopen}>
                            <div id="category">
                                <Nav.Link href="/admin/categories/add">
                                    Add
                                </Nav.Link>
                                <Nav.Link href="/admin/categories">
                                    Categories
                                </Nav.Link>
                            </div>
                        </Collapse>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link   
                            onClick={() => setProductopen(!productopen)}
                            aria-controls="products"
                            aria-expanded={productopen}
                        >
                           <FontAwesomeIcon icon={faList} /> Products
                        </Nav.Link>
                        <Collapse in={productopen}>
                            <div id="products">
                                <Nav.Link href="/admin/products/add">Add</Nav.Link>
                                <Nav.Link href="/admin/products">Products List</Nav.Link>
                            </div>
                        </Collapse>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default withRouter(Sidebar);
