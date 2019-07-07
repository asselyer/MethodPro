import axios from 'axios';
import { API_URL } from './constants';

const getArticles = ({ search, sort, pageSize, page }) => {
  return axios.get(
    `${API_URL}&q=${search}&sortBy=${sort}&pageSize=${pageSize}&page=${page}`
  );
}

export {
  getArticles
}
