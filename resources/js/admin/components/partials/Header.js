import React from 'react'
import { withRouter } from 'react-router'
import Auth from '../../apis/Auth'
class Header extends React.Component {
    constructor (props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout (e) {
        e.preventDefault()
        Auth.logout(response => {
            this.props.history.push('/login')
        }),
            err => {
                alert(err.response.data.message)
            }
    }

    componentDidMount () {

        const checkauth = setInterval(() => {

            if (!localStorage.getItem('user.api_token')) {
                Auth.checkAuth(
                    response => {},
                    err => {
                        clearInterval(checkauth)
                        localStorage.clear()
                        this.props.history.push('/login')
                    }
                )
            }
        }, 2000)
    }
    render () {
        return (
            <div className='navbar-custom'>
                <ul className='list-unstyled topnav-menu float-right mb-0'>
                    <li className='d-none d-sm-block'>
                        <form className='app-search'>
                            <div className='app-search-box'>
                                <div className='input-group'>
                                    <div className='input-group-append'>
                                        <button className='btn' type='submit'>
                                            <i className='fe-search'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </li>

                    <li className='dropdown notification-list'>
                        <a
                            className='nav-link dropdown-toggle  waves-effect'
                            data-toggle='dropdown'
                            href='apps-calendar.html#'
                            role='button'
                            aria-haspopup='false'
                            aria-expanded='false'
                        >
                            <i className='fe-bell noti-icon'></i>
                            <span className='badge badge-danger rounded-circle noti-icon-badge'>
                                4
                            </span>
                        </a>
                        <div className='dropdown-menu dropdown-menu-right dropdown-lg'>
                            <div className='dropdown-item noti-title'>
                                <h5 className='m-0'>
                                    <span className='float-right'>
                                        <a
                                            href='apps-calendar.html'
                                            className='text-dark'
                                        >
                                            <small>Clear All</small>
                                        </a>
                                    </span>
                                    Notification
                                </h5>
                            </div>

                            <div className='slimscroll noti-scroll'>
                                <a
                                    href='javascript:void(0);'
                                    className='dropdown-item notify-item'
                                >
                                    <div className='notify-icon bg-success'>
                                        <i className='mdi mdi-comment-account-outline'></i>
                                    </div>
                                    <p className='notify-details'>
                                        Caleb Flakelar commented on Admin
                                        <small className='text-muted'>
                                            1 min ago
                                        </small>
                                    </p>
                                </a>

                                <a
                                    href='javascript:void(0);'
                                    className='dropdown-item notify-item'
                                >
                                    <div className='notify-icon bg-info'>
                                        <i className='mdi mdi-account-plus'></i>
                                    </div>
                                    <p className='notify-details'>
                                        New user registered.
                                        <small className='text-muted'>
                                            5 hours ago
                                        </small>
                                    </p>
                                </a>

                                <a
                                    href='javascript:void(0);'
                                    className='dropdown-item notify-item'
                                >
                                    <div className='notify-icon bg-danger'>
                                        <i className='mdi mdi-heart'></i>
                                    </div>
                                    <p className='notify-details'>
                                        Carlos Crouch liked <b>Admin</b>
                                        <small className='text-muted'>
                                            3 days ago
                                        </small>
                                    </p>
                                </a>

                                <a
                                    href='javascript:void(0);'
                                    className='dropdown-item notify-item'
                                >
                                    <div className='notify-icon bg-warning'>
                                        <i className='mdi mdi-comment-account-outline'></i>
                                    </div>
                                    <p className='notify-details'>
                                        Caleb Flakelar commented on Admin
                                        <small className='text-muted'>
                                            4 days ago
                                        </small>
                                    </p>
                                </a>

                                <a
                                    href='javascript:void(0);'
                                    className='dropdown-item notify-item'
                                >
                                    <div className='notify-icon bg-purple'>
                                        <i className='mdi mdi-account-plus'></i>
                                    </div>
                                    <p className='notify-details'>
                                        New user registered.
                                        <small className='text-muted'>
                                            7 days ago
                                        </small>
                                    </p>
                                </a>

                                <a
                                    href='javascript:void(0);'
                                    className='dropdown-item notify-item'
                                >
                                    <div className='notify-icon bg-primary'>
                                        <i className='mdi mdi-heart'></i>
                                    </div>
                                    <p className='notify-details'>
                                        Carlos Crouch liked <b>Admin</b>
                                        <small className='text-muted'>
                                            13 days ago
                                        </small>
                                    </p>
                                </a>
                            </div>

                            <a
                                href='javascript:void(0);'
                                className='dropdown-item text-center text-primary notify-item notify-all'
                            >
                                View all
                                <i className='fi-arrow-right'></i>
                            </a>
                        </div>
                    </li>

                    <li className='dropdown notification-list'>
                        <a
                            className='nav-link dropdown-toggle nav-user mr-0 waves-effect'
                            data-toggle='dropdown'
                            href='apps-calendar.html#'
                            role='button'
                            aria-haspopup='false'
                            aria-expanded='false'
                        >
                            <img
                                src='assets/images/users/avatar-1.jpg'
                                alt='user-image'
                                className='rounded-circle'
                            />
                            <span className='pro-user-name ml-1'>
                                Maxine K{' '}
                                <i className='mdi mdi-chevron-down'></i>
                            </span>
                        </a>
                        <div className='dropdown-menu dropdown-menu-right profile-dropdown '>
                            <div className='dropdown-item noti-title'>
                                <h6 className='text-overflow m-0'>Welcome !</h6>
                            </div>

                            <a
                                href='javascript:void(0);'
                                className='dropdown-item notify-item'
                            >
                                <i className='fi-head'></i>{' '}
                                <span>My Account</span>
                            </a>

                            <a
                                href='javascript:void(0);'
                                className='dropdown-item notify-item'
                            >
                                <i className='fi-cog'></i> <span>Settings</span>
                            </a>

                            <a
                                href='javascript:void(0);'
                                className='dropdown-item notify-item'
                            >
                                <i className='fi-help'></i> <span>Support</span>
                            </a>

                            <a
                                href='javascript:void(0);'
                                className='dropdown-item notify-item'
                            >
                                <i className='fi-lock'></i>{' '}
                                <span>Lock Screen</span>
                            </a>

                            <a
                                href='javascript:void(0);'
                                className='dropdown-item notify-item'
                            >
                                <i className='fi-power'></i> <span>Logout</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Header
