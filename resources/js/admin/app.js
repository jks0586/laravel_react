import React, { Component } from "react";
import ReactDOM from "react-dom";
import {  Router } from "react-router-dom";
import Sidebar from "./components/partials/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import Routes from "./Routes";
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
const classcontainer = { left_class: "col-md-2 h-100", right_class: "col-md-10 h-100" };
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                {localStorage.getItem("user.is_admin") == 1 && (
                    <div id="wrapper" className="row">
                        <div
                            className={classcontainer.left_class}
                            id="sidebar-left"
                        >
                            <Sidebar />
                        </div>
                        <div
                            className={classcontainer.right_class}
                            id="sidebar-right"
                        >
                            <Routes />
                        </div>
                    </div>
                )}

                {(localStorage.getItem("user.is_admin") == 0 ||
                    localStorage.getItem("user.is_admin") == undefined ||
                    localStorage.getItem("user.is_admin") == null) && (
                    <div className="col-md-12 h-100" id="sidebar-right"> 
                        <Routes />
                    </div>
                )}
            </Router>
        );
    }
}
if (document.getElementById("admin")) {
    ReactDOM.render(<App />, document.getElementById("admin"));
}
