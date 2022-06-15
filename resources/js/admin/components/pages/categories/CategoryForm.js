import React from 'react'

class Form extends React.Component {
    constructor (props) {
        super(props)
        // console.log(this.props.categories.category.title);
        // console.log(this.props);
    }
    render () {
        return (
            <div>
                <div>
                    <div className='form-group'>
                        <label>Category Title</label>
                        <input
                            type='text'
                            name='title'
                            className='form-control'
                            placeholder='Category title'
                            onChange={this.props.handleChange}
                            value={
                                this.props.categories.category.title
                                    ? this.props.categories.category.title
                                    : ''
                            }
                        />

                        {this.props.categories.validation_errors != null ? (
                            <div className='help-block'>
                                {
                                    this.props.categories.validation_errors
                                        .title[0]
                                }
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Form
