import axios from 'axios';

const api = axios.create({
  baseURL: 'https://happy-sv.herokuapp.com/',
});

export default api;
