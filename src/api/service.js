import axios from 'axios';

export default axios.create({
  baseURL: 'http://scada.asuscomm.com:8081/api/v1',
  headers: { 'Content-Type': 'application/json' },
});