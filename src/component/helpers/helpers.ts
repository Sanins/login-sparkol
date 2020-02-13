import axios from 'axios';

export function setAuthToken(token?:any) {
	axios.defaults.headers.common['Authorization'] = '';
	delete axios.defaults.headers.common['Authorization'];
  
	if (token) {
	  axios.defaults.headers.common['Authorization'] = `${token}`;
	}
}