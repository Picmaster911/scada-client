import axios from 'axios';

export default axios.create({
  baseURL: 'http://217.24.162.58:8081/api/v1',
  headers: { 'Content-Type': 'application/json' },
});