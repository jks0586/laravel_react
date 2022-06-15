import axios from 'axios'

const Category = {
    list: (page = 1) => {
        return axios.get('categories?page=' + page)
    },
    add: title => {
        return axios.post('/categories', { title })
    },
    showOne: id => {
        return axios.get('/categories/' + id)
    },
    edit: (title, id) => {
        return axios.put('/categories/' + id, { title })
    },
    remove:(id)=>{
        return axios.delete('/categories/'+id);
    },
    listAll:()=>{
        return axios.get('/categories?all');
    }
}

export default Category
