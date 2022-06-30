import Api from "./api"

const UserService = {
    listAll: async (req)=>{
        return await Api.get('/graphql?query='+req);
    },
    add: async (req) => {
        // alert('title');
        return await Api.post('/graphql',req)
        // return await Api.letres(Api.post('/graphql',req))
    },
    delete: async (req) => {
        return await Api.post('/graphql',req)
    },
    get: async (req) => {
        // return await Api.getRes();
        return await Api.post('/graphql',req)
        // return await Api.letres(Api.post('/graphql',req))
    },
}

export default UserService
