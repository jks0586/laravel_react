import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
class CategoryForm extends React.Component {
    constructor (props) {
        super(props)
        // console.log(this.props.categories.category.title);
        // console.log(this.props);
        this.state = {
            title: '',
            description: '',
            image: '',
            slug: ''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    handleTitleChange (e) {
        this.setState({'title':e.target.value});
        console.log(this.state);
        e.preventDefault()
    }
    handleSubmit (e) {
        console.log('yyyyyy')
        e.preventDefault()
    }

    render () {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className='mb-3' controlId='formTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Title'
                        name='title'
                        value={this.state.value}
                        onChange={this.handleTitleChange}
                    />
                    <Form.Text className='text-muted'>
                        Please fill category title
                    </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formDescription'>
                    <Form.Label>Description</Form.Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data='<p>Hello from CKEditor 5!</p>'
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor)
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            console.log({ event, editor, data })
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor)
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor)
                        }}
                    />
                    <Form.Text className='text-muted'>
                        Please Fill Category Description
                    </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formImage'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file' placeholder='Select Image' />
                    <Form.Text className='text-muted'>
                        Please select you image
                    </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formSlug'>
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Slug'
                        name='slug'
                    />
                    <Form.Text className='text-muted'>
                        Please fill category slug
                    </Form.Text>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        )
    }
}

export default CategoryForm
