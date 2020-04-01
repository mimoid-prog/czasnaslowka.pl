import api from '../api';

export const signup = data => dispatch => api.user.signup(data)
	