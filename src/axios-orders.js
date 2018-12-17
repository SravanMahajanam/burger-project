import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-msk.firebaseio.com/'
});

export default instance;