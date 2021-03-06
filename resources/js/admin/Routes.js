import React from "react";
import {
    Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "./components/login/Login";
import AuthenticatedRoute from './AuthenticatedRoute';
import Dashboard from "./components/pages/Dashboard";
import ListPosts from "./components/pages/posts/Index";
import AddPosts from "./components/pages/posts/Add";
import CategoryList from "./components/pages/categories/Index";
import AddCategories from "./components/pages/categories/Add";
import EditCategories from "./components/pages/categories/Edit";
import ListUsers from "./components/pages/users/Index";
import AddUser from "./components/pages/users/Add";
import EditUser from "./components/pages/users/Edit";
// import { createBrowserHistory } from "history";
// products component

import Products from "./components/pages/products/Index";
import AddProduct from "./components/pages/products/Add";
import EditProduct from "./components/pages/products/Edit";

class Routes extends React.Component
{
    constructor (props) {
        super(props)
        // this.history = createBrowserHistory();
    }
    
    render()
    {
        return(
            <Router>
                <Switch>
                    <Route exact path='/admin/login' component={Login} />
                    <AuthenticatedRoute exact path='/admin/dashboard' component={Dashboard} />
                    <AuthenticatedRoute exact path='/admin/categories' component={CategoryList} />
                    <AuthenticatedRoute path='/admin/categories/add' component={AddCategories} />
                    <AuthenticatedRoute path='/admin/categories/edit/:id' component={EditCategories} />
                    <AuthenticatedRoute exact path='/admin/users' component={ListUsers} />
                    <AuthenticatedRoute path='/admin/users/add' component={AddUser} />
                    <AuthenticatedRoute path='/admin/users/edit/:id' component={EditUser} />

                     {/* Product Routes  start   */}


                    <AuthenticatedRoute exact path='/admin/products' component={Products} />
                    <AuthenticatedRoute path='/admin/products/add' component={AddProduct} />
                    <AuthenticatedRoute path='/admin/products/edit/:id' component={EditProduct} />

                     {/* Product Routes  end  */}

                    {/* <Route exact path='/admin/' component={Dashboard} />
                    <Route exact path='/admin/posts' component={ListPosts} />
                    <Route path='/posts/add' component={AddPosts} />
                    <Route exact path='/categories' component={ListCategories} />
                    <Route path='/categories/add' component={AddCategories} />
                    <Route path='/categories/edit/:id' component={EditCategories} /> */}
                </Switch>
            </Router>
        )
    }
}

export default Routes;
