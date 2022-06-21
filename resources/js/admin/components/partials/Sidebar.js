import React from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { withRouter } from 'react-router'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
const Sidebar = props => {
    // console.log(props)
    // return props.location.pathname != '/admin/login'?(

    return (
        <Navbar expand={true}>
            <Container fluid>
                <Nav className='flex-column'>
                    <Nav.Item>
                        <Nav.Link href='/admin/dahboard'>Dashbaord</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href='/admin/categories'>Categories</Nav.Link>
                    </Nav.Item>

                    <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.1'>
                            Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.2'>
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.3'>
                            Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href='#action/3.4'>
                            Separated link ddddddd
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                        <Nav.Link href='#action3'>Link dddddddddddddd</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )

    // <div className="left-side-menu">
    //     <div className="slimscroll-menu">
    //         <div className="logo-box">
    //         <a href="javascript:void(0);" className="logo">
    //                 <span className="logo-lg">
    //                     <img src="assets/images/logo-light.png" alt="" height="22" />
    //                     {/* <span className="logo-lg-text-light">Highdmin</span> */}
    //                 </span>
    //                 <span className="logo-sm">
    //                     {/* <span className="logo-sm-text-dark">H</span> --> */}
    //                     <img src="assets/images/logo-sm.png" alt="" height="24" />
    //                 </span>
    //             </a>
    //         </div>

    //         <div className="user-box">
    //             <img src="assets/images/users/avatar-1.jpg" alt="user-img" title="Mat Helme" className="rounded-circle img-thumbnail avatar-md" />
    //             <div className="dropdown">
    //                 <a href="javascript:void(0);" className="text-dark dropdown-toggle h5 mt-2 mb-1 d-block" data-toggle="dropdown">Jitendra Sharma</a>
    //             </div>
    //             <p className="text-muted">CEO Lestcms Pvt Ltd</p>
    //         </div>

    //         <div id="sidebar-menu">
    //             <ul className="metismenu" id="side-menu">
    //             <li>
    //                 <a href="javascript:void(0);">
    //                     <i className="fe-airplay"></i>
    //                     <span className="badge badge-danger float-right"></span>
    //                     <span> Dashboard </span>
    //                 </a>
    //             </li>

    //             <li>
    //                 <Link to='/admin/posts'>
    //                     <i className="fa fa-th"></i> <span>Posts</span>
    //                 </Link>
    //             </li>

    //             <li className={props.location.pathname=='/admin/categories'?'active':''}>
    //                 <Link to='/admin/categories'>
    //                     <i className="fa fa-list"></i> <span>Categories</span>
    //                 </Link>
    //             </li>

    //             <li>
    //                 <a href="javascript:void(0);">
    //                     <i className="fa fa-tags"></i> <span>Tags</span>
    //                 </a>
    //             </li>
    //             <li>
    //                 <a href="javascript:void(0);">
    //                     <i className="fa fa-comments"></i> <span>Comments</span>
    //                 </a>
    //             </li>
    //             <li>
    //                 <a href="javascript:void(0);">
    //                     <i className="fa fa-users"></i> <span>Users</span>
    //                 </a>
    //             </li>

    //             </ul>
    //         </div>
    //     </div>
    // </div>

    // ):null;
}

export default withRouter(Sidebar)
