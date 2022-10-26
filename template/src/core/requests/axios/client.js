import axios from 'axios';

export default function createAxiosClient({ baseURL }) {
  const instance = axios.create({ baseURL });

  // // Config axios options here
  instance.defaults.headers.common['Content-Type'] = 'application/json';
  return instance;
}
