import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UserService from "../../../apis/Users";
import CategoryService from "./../../../apis/Category";
import { request, gql } from "graphql-request";
import { withRouter } from "react-router-dom";
import validator from "validator";
import Loading from "react-fullscreen-loading";
import Settings from "../../partials/settings";

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            slug: "",
            description: "",
            price: "",
            sale_price: "",
            sku: "",
            quantity: "",
            in_stock: false,
            is_taxable: false,
            image: "",
            imagepreview: "",
            category_id: "",
            status: "",
            views: "",
            meta_title: "",
            meta_keyword: "",
            meta_description: "",
            categories: [],
            formErrors: {},
            isLoading: false,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSlugChange = this.handleSlugChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSalePriceChange = this.handleSalePriceChange.bind(this);
        this.handleSkuChange = this.handleSkuChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
        this.handleIsTaxableChange = this.handleIsTaxableChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleCategoryIdChange = this.handleCategoryIdChange.bind(this);
        this.handleMetaTitleChange = this.handleMetaTitleChange.bind(this);
        this.handleMetaKeywordChange = this.handleMetaKeywordChange.bind(this);
        this.handleMetaDescriptionChange =
            this.handleMetaDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
        delete this.state.formErrors["name"];
        e.preventDefault();
    }

    handleSlugChange(e) {
        this.setState({ slug: e.target.value });
        delete this.state.formErrors["slug"];
        e.preventDefault();
    }
    handlePriceChange(e) {
        if (Settings.checkNumber(e.target.value)) {
            this.setState({ price: e.target.value });
        } else {
            let fieldValidationErrors = this.state.formErrors;
            fieldValidationErrors["price"] = "Price Field could not be empty";
            this.setState({ formErrors: fieldValidationErrors });
        }
        delete this.state.formErrors["price"];
        e.preventDefault();
    }

    handleSalePriceChange(e) {
        if (Settings.checkNumber(e.target.value)) {
            this.setState({ sale_price: e.target.value });
        } else {
            let fieldValidationErrors = this.state.formErrors;
            fieldValidationErrors["sale_price"] =
                "Price Field could not be empty";
            this.setState({ formErrors: fieldValidationErrors });
        }
        delete this.state.formErrors["sale_price"];
        e.preventDefault();
    }

    handleSkuChange(e) {
        this.setState({ sku: e.target.value });
        delete this.state.formErrors["sku"];
        e.preventDefault();
    }

    handleQuantityChange(e) {
        this.setState({ quantity: e.target.value });
        delete this.state.formErrors["quantity"];
        e.preventDefault();
    }

    handleInStockChange(e) {
        // console.log(e.target.checked);
        if(e.target.checked){
            this.setState({ in_stock: true });
        } else {
            this.setState({ in_stock: false });
        }
        delete this.state.formErrors["in_stock"];
        // console.log(this.state);
        e.preventDefault();
    }

    handleIsTaxableChange(e) {
        if(e.target.checked){
        this.setState({ is_taxable: true });
        } else {
        this.setState({ is_taxable: false });
        }
        delete this.state.formErrors["is_taxable"];
        e.preventDefault();
    }

    handleCategoryIdChange(e) {
        this.setState({ category_id: e.target.value });
        delete this.state.formErrors["category_id"];
        e.preventDefault();
    }

    handleMetaTitleChange(e) {
        this.setState({ meta_title: e.target.value });
        delete this.state.formErrors["meta_title"];
        e.preventDefault();
    }

    handleMetaKeywordChange(e) {
        this.setState({ meta_keyword: e.target.value });
        delete this.state.formErrors["meta_keyword"];
        e.preventDefault();
    }

    handleMetaDescriptionChange(e) {
        this.setState({ meta_description: e.target.value });
        delete this.state.formErrors["meta_description"];
        e.preventDefault();
    }

    handleStatusChange(e) {
        this.setState({ status: e.target.value });
        delete this.state.formErrors["status"];
        e.preventDefault();
    }

    handleImageChange(e) {
        this.setState({ image: e.target.files[0] });
        this.previewFile(e.target.files[0]);
        delete this.state.formErrors["image"];

        setTimeout(function () {
            let imgset = document.getElementById("imagePreview");
            // this.setState({title : imgset.getAttribute('src')})
        }, 1000);

        e.preventDefault();
    }

    previewFile(file) {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }

        reader.onloadend = function (e) {
            let imgset = document.getElementById("imagePreview");
            imgset.setAttribute("src", reader.result);
            imgset.setAttribute("width", 50);
            imgset.setAttribute("height", 50);
            //
            this.setState({ imagePreview: reader.result });
        }.bind(this);
    }

    productValidate(e) {
        // console.log(this.state);
        const { id } = this.props.match.params;
        let fieldValidationErrors = this.state.formErrors;
        Object.keys(this.state).forEach((value, index) => {
            switch (value) {
                case "name":
                    if (
                        value == "name" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;

                case "slug":
                    if (
                        value == "slug" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;

                case "description":
                    if (
                        value == "description" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;

                case "price":
                    if (
                        value == "price" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    } else if (
                        !Settings.checkNumber(e.target.value) &&
                        !Settings.checkNumber(e.target.value) == "NaN"
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;

                case "sale_price":
                    if (
                        value == "sale_price" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    } else if (
                        !Settings.checkNumber(e.target.value) &&
                        !Settings.checkNumber(e.target.value) == "NaN"
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "sku":
                    if (
                        value == "sku" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;

                case "quantity":
                    if (
                        value == "quantity" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    } else if (
                        !Settings.checkQuantity(e.target.value) &&
                        !Settings.checkQuantity(e.target.value) == "NaN"
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "in_stock":
                    if (
                        value == "in_stock" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "is_taxable":
                    if (
                        value == "is_taxable" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "image":
                    if (
                        value == "image" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "category_id":
                    if (
                        value == "category_id" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "status":
                    if (
                        value == "status" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "status":
                    if (
                        value == "status" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "meta_title":
                    if (
                        value == "meta_title" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "meta_keyword":
                    if (
                        value == "meta_keyword" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
                case "meta_description":
                    if (
                        value == "meta_description" &&
                        (this.state[value] == "" ||
                            this.state[value] == undefined)
                    ) {
                        fieldValidationErrors[value] =
                            value.charAt(0).toUpperCase() +
                            value.slice(1) +
                            " Field could not be empty";
                    }
                    break;
            }
            // console.log(value,this.state[value]);
        });

        // console.log(fieldValidationErrors);

        this.setState({ formErrors: fieldValidationErrors });

        // console.log(this.state.formErrors.length)

        if (_.isEmpty(this.state.formErrors)) {
            return true;
        } else {
            return false;
        }

        // console.log(formErrors);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id } = this.props.match.params;
        if (this.productValidate(e)) {
            // console.log(this.state);
            const postdata = {};
            Object.keys(this.state).forEach((value, index) => {
                postdata[value] = this.state[value];
            });
            // console.log(postdata);
            if (id) {
                this.setState({ isLoading: true });

                const catpost = {
                    query: `mutation updateUser($id: Int!,$name: String!, $email: String!,$avtar: String,$password: String,  $is_admin: Int) {
                        updateUser(id:$id,name: $name,email: $email,avtar:$avtar,password:$password,is_admin: $is_admin){
                            id,
                            name,
                            email,
                            avtar,
                            password,
                            is_admin
                        }
                    }`,
                    variables: {
                        id: parseInt(id),
                        name: postdata.name,
                        email: postdata.email,
                        avtar: postdata.avtarPreview,
                        password: postdata.password,
                        is_admin: parseInt(postdata.is_admin),
                        isLoading: false,
                    },
                };

                // console.log(catpost);

                UserService.add(catpost)
                    .then((response) => {
                        if (
                            response.status == 200 &&
                            (response.data.data.error == undefined ||
                                response.data.data.error == "")
                        ) {
                            this.setState({ isLoading: false });
                            this.props.history.push("/admin/users");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                this.setState({ isLoading: true });
                const catpost = {
                    query: `mutation createUser($name: String!, $email: String!, $avtar: String,$password: String!, $is_admin: Int) {
                        createUser(name: $name,email: $email,avtar: $avtar,password: $password,is_admin: $is_admin){
                            name,
                            email,
                            avtar,
                            password,
                            is_admin
                        }
                    }`,
                    variables: {
                        name: postdata.name,
                        email: postdata.email,
                        password: postdata.password,
                        avtar: postdata.avtarPreview,
                        is_admin: parseInt(postdata.is_admin),
                        isLoading: false,
                    },
                };

                UserService.add(catpost)
                    .then((response) => {
                        if (
                            response.status == 200 &&
                            (response.data.data.error == undefined ||
                                response.data.data.error == "")
                        ) {
                            this.setState({ isLoading: false });
                            this.props.history.push("/admin/users");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }

    componentDidMount() {
        // const x='64g';
        // console.log(Settings.checkNumber(x));

        const qry = `{categories{id,title}}`;
        CategoryService.listAll(qry)
            .then((response) => {
                this.setState({
                    categories: response.data.data.categories,
                    loading: false,
                });
            })
            .catch((error) => {
                console.log(error);
            });

        // console.log(Object.values(Settings.status));
        const { id } = this.props.match.params;
        if (id) {
            const uid = parseInt(id);
            const catpost = {
                query: `query getUser($id:Int!){
                    user(id:$id){
                        id,
                        name,
                        avtar,
                        email,
                        is_admin
                      }
                }
            `,
                variables: {
                    id: uid,
                },
            };
            this.setState({ isLoading: true });
            UserService.get(catpost)
                .then((response) => {
                    console.log(response);
                    let setdata = {
                        email: response.data.data.user.email,
                        name: response.data.data.user.name,
                        avtar: response.data.data.user.avtar,
                        avtarPreview: response.data.data.user.avtar,
                        is_admin: response.data.data.user.is_admin,
                        isLoading: false,
                    };
                    this.setState(setdata);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        // const { id } = this.props.match.params;
        return (
            // const { userName } = this.props.match.params;

            <>
                <Loading
                    loading={this.state.isLoading}
                    background="#00000000"
                    loaderColor="#ffffff"
                />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        />
                        <Alert
                            show={this.state.formErrors["name"] ? true : false}
                            variant="danger"
                        >
                            {this.state.formErrors["name"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSlug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Slug"
                            name="slug"
                            value={this.state.slug}
                            onChange={this.handleSlugChange}
                        />
                        <Alert
                            show={this.state.formErrors["slug"] ? true : false}
                            variant="danger"
                        >
                            {this.state.formErrors["slug"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor 5!</p>"
                            onReady={(editor) => {
                                const data = editor.getData();
                                this.setState({ description: data });
                                // You can store the "editor" and use when it is needed.
                                // console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                this.setState({ description: data });
                                // console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                const data = editor.getData();
                                this.setState({ description: data });
                                // console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                                const data = editor.getData();
                                this.setState({ description: data });
                            }}
                        />
                        <Alert
                            show={
                                this.state.formErrors["description"]
                                    ? true
                                    : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["description"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Price"
                            name="price"
                            value={this.state.price}
                            onChange={this.handlePriceChange}
                        />
                        <Alert
                            show={this.state.formErrors["price"] ? true : false}
                            variant="danger"
                        >
                            {this.state.formErrors["price"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSalePrice">
                        <Form.Label>Sale Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Sale Price"
                            name="sale_price"
                            value={this.state.sale_price}
                            onChange={this.handleSalePriceChange}
                        />
                        <Alert
                            show={
                                this.state.formErrors["sale_price"]
                                    ? true
                                    : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["sale_price"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSku">
                        <Form.Label>SKU</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Sku"
                            name="sku"
                            value={this.state.sku}
                            onChange={this.handleSkuChange}
                        />
                        <Alert
                            show={this.state.formErrors["sku"] ? true : false}
                            variant="danger"
                        >
                            {this.state.formErrors["sku"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Quantity"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.handleQuantityChange}
                        />
                        <Alert
                            show={
                                this.state.formErrors["quantity"] ? true : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["quantity"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIn_stock">
                        
                        <Form.Check
                            type="checkbox"
                            name="in_stock"
                            id="in_stock"
                            label="IN Stock"
                            onChange={this.handleInStockChange}
                        />
                        
                        <Alert
                            show={
                                this.state.formErrors["in_stock"] ? true : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["in_stock"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIs_taxable">
                        
                        <Form.Check
                            type="checkbox"
                            name="is_taxable"
                            id="is_taxable"
                            label="Is Taxable"
                            onChange={this.handleIsTaxableChange}
                        />
                        
                        <Alert
                            show={
                                this.state.formErrors["is_taxable"]
                                    ? true
                                    : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["is_taxable"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formImage">
                        <Form.Label>Product image</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Select Image"
                            name="image"
                            onChange={this.handleImageChange}
                        />
                        <Card style={{ width: "50px" }}>
                            <Card.Img
                                id="imagePreview"
                                src={this.state.imagePreview}
                            />
                        </Card>
                        <Alert
                            show={this.state.formErrors["image"] ? true : false}
                            variant="danger"
                        >
                            {this.state.formErrors["image"]}
                        </Alert>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCategory_id">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            aria-label="Enter Categroy"
                            name="category_id"
                            id="category_id"
                            onChange={this.handleCategoryIdChange}
                        >
                            <option>Select Category</option>
                            {this.state.categories.map((category, index) => {
                                return (
                                    <option key={index} value={category.id}>
                                        {category.title}
                                    </option>
                                );
                            })}
                        </Form.Select>

                        <Alert
                            show={
                                this.state.formErrors["category_id"]
                                    ? true
                                    : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["category_id"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMetatitle">
                        <Form.Label>Meta Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter meta Title"
                            name="meta_title"
                            value={this.state.meta_title}
                            onChange={this.handleMetaTitleChange}
                        />
                        <Alert
                            show={
                                this.state.formErrors["meta_title"]
                                    ? true
                                    : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["meta_title"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMetatitle">
                        <Form.Label>Meta Keyword</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Meta Keyword"
                            name="meta_keyword"
                            value={this.state.meta_keyword}
                            onChange={this.handleMetaKeywordChange}
                        />
                        <Alert
                            show={
                                this.state.formErrors["meta_keyword"]
                                    ? true
                                    : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["meta_keyword"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMetatitle">
                        <Form.Label>Meta Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Meta Description"
                            name="meta_description"
                            value={this.state.meta_description}
                            onChange={this.handleMetaDescriptionChange}
                        />
                        <Alert
                            show={
                                this.state.formErrors["meta_description"]
                                    ? true
                                    : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["meta_description"]}
                        </Alert>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={this.handleStatusChange}
                        >
                            <option value="">Select Status</option>
                            {Object.keys(Settings.status).map(
                                (status, index) => {
                                    return (
                                        <option key={index} value={status}>
                                            {Settings.status[status]}
                                        </option>
                                    );
                                }
                            )}
                        </Form.Select>
                        <Alert
                            show={
                                this.state.formErrors["status"] ? true : false
                            }
                            variant="danger"
                        >
                            {this.state.formErrors["status"]}
                        </Alert>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </>
        );
    }
}

export default withRouter(ProductForm);
