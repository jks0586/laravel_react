import React from "react";
import Breadcrumb from "../../partials/Breadcrumb";
class CategoryEdit extends React.Component
{
     render(){
        return(
            <div className="content-wrapper">
                <Breadcrumb/>
                <section className="content">
                    Edit categories
                </section>
            </div>
        )
    }
}


export default CategoryEdit;
