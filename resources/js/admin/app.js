import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/partials/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './admin.css'
export default class App extends React.Component {
    render () {
        return (
            <Router>
                <div id='wrapper' className="row">
                    <div className='col-md-2' id='sidebar-left'>
                        <Sidebar />
                    </div>
                    <div className="col-md-10" id="sidebar-right">
                        <h1>welcome React Js</h1>
                    </div>
                </div>
            </Router>
        )
    }
}
if (document.getElementById('admin')) {
    ReactDOM.render(<App />, document.getElementById('admin'))
}
