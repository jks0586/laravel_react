import axios from "axios";
const Api = axios.create({
  baseURL: "http://laravel-react.com/graphql",
  headers: {
    "Content-type": "application/json",
    "Authorization":'Bearer '+localStorage.getItem('letscms_user_token'),
  }
});


export default Api

