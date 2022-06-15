import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './store/reducers/RootReducer';
import Footer from './components/partials/Footer'
import Header from './components/partials/Header'
import Sidebar from './components/partials/Sidebar'

import Routes from './Routes'
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default class App extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <Router>
                    <div id='wrapper'>
                        <Sidebar />
                        <div className='content-page'>
                            <Header />
                            <div className='content'>
                                <div className='container-fluid'>
                                    <Routes />
                                </div>
                            </div>
                            <Footer />
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
