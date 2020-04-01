import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api';
import setAuthorizationHeader from '../components/utils/setAuthorizationHeader';

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = credentials => dispatch => 
    api.user.login(credentials)
        .then(answer => {
            if(answer.user) {
                localStorage.czasnaslowkaJWT = answer.user.token;
                setAuthorizationHeader(answer.user.token);
                dispatch(userLoggedIn(answer.user));
            };
            return answer;
        });

export const logout = () => dispatch => {
    localStorage.removeItem("czasnaslowkaJWT");
    dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
    api.user.confirm(token)
        .then(user => user);

export const resetPasswordRequest = ({ email }) => () => 
    api.user.resetPasswordRequest(email);

export const validateToken = token => () =>
    api.user.validateToken(token);

export const resetPassword = data => () =>
    api.user.resetPassword(data);