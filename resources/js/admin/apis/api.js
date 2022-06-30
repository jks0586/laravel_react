import axios from "axios";


// axios.prototype.getRes = function getRes(res) {
//   const datares={'t1':'aaaa','t2':'yyyy'};
//   return datares;
// };


const Api = axios.create({
  baseURL: "http://laravel-react.com",
  headers: {
    "Content-type": "application/json,multipart/form-data",
    "Authorization":'Bearer '+localStorage.getItem('letscms_user_token'),
  }
});

// headers: {
//   'x-device-id': 'stuff',
//   'Content-Type': 'multipart/form-data'
// }
// Api.prototype.Letres=function(){
//   const datares={'t1':'aaaa','t2':'yyyy'};
//   // console.log('aaaaaa');
//   return datares;
// }

export default Api

