import Api from "./api"

const ProductService = {

     listAll: async (req)=>{
        // console.log(req);
        return await Api.get('/graphql?query='+req);

    },
    add: async (req) => {
        console.log(req);
        return await Api.post('/graphql',req)
    },

    get: async (req) => {
        console.log(req);
        return await Api.post('/graphql',req)
    },

    delete: async (req) => {

        console.log(req);

        return await Api.post('/graphql',req)
    }

}

export default ProductService