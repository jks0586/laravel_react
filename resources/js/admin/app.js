import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/partials/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './admin.css';
import Routes from './Routes';
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
const classcontainer={'left_class':'col-md-2','right_class':'col-md-10'};

export default class App extends React.Component {
    
    render () {
        return (
            <Provider store={store}>
            <Router>
                <div id='wrapper' className="row">
                    <div className={classcontainer.left_class} id='sidebar-left'>
                        <Sidebar />
                    </div>
                    <div className={classcontainer.right_class} id="sidebar-right">
                        <Routes/>
                    </div>
                </div>
            </Router>
            </Provider>
        )
    }
}
if (document.getElementById('admin')) {
    ReactDOM.render(<App />, document.getElementById('admin'))
}
