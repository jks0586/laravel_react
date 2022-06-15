import React from "react";
import Breadcrumb from "../../partials/Breadcrumb";

class AddPosts extends React.Component
{
    render(){
        return(
            <div className="content-wrapper">
                <Breadcrumb/>
                <section className="content">
                    Add posts
                </section>
            </div>
        );
    }
}

export default AddPosts;

