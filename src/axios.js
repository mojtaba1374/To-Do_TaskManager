import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
});
let accessToken = localStorage.getItem('access');
console.log(accessToken);

instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

// console.log(localStorage.getItem('access'));

export default instance;