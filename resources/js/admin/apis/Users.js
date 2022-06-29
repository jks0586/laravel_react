import Api from "./api"

const UserService = {
    listAll: async (req)=>{
        // console.log(req);
        return await Api.get('/graphql?query='+req);

    },
    add: async (req) => {
        // console.log(req);
        return await Api.post('/graphql',req)
    },
    delete: async (req) => {

        console.log(req);

        return await Api.post('/graphql',req)
    }
}

export default UserService
