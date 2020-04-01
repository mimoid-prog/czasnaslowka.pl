import { SETS_FETCHED, USER_LOGGED_OUT } from '../types';

export default function sets(state = {}, action = {}) {
    switch(action.type) {
        case SETS_FETCHED:
            return { items: action.data, fetched: true };
        case USER_LOGGED_OUT:
            return {};
        default: 
            return state;
    }
}