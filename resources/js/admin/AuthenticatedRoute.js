import React,{ Component } from "react";

import { Route } from 'react-router-dom';

import { Redirect, withRouter  } from "react-router";
import { rest } from "lodash";

const AuthenticatedRoute=({component:Component,...rest})=>{
    return (
    <Route
    {...rest}
    render={
        props=>localStorage.getItem("user.api_token")?
        (
        <Component {...props}/>
        ):
        (
        <Redirect
        to={{ pathname:"/admin/login",
        state:{from:props.location}}} />
        )} />
    )
};

export default withRouter(AuthenticatedRoute);
