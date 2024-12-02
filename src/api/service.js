import axios from 'axios';

export default axios.create({
  baseURL: 'http://93.127.20.110:8081/api/v1',
  headers: { 'Content-Type': 'application/json' },
});