import React from "react";
import {
    BrowserRouter as Router,
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

class Routes extends React.Component
{
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
