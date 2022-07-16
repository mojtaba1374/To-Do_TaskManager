import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// console.log(localStorage.getItem('access'));

export default instance;