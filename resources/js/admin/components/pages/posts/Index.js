import React from "react";
import Breadcrumb from "../../partials/Breadcrumb";

class ListPosts extends React.Component
{
    render(){
        return(
            <div className="content-wrapper">
                <Breadcrumb/>
                <section className="content">
                    list posts
                </section>
            </div>
        );
    }
}

export default ListPosts;

