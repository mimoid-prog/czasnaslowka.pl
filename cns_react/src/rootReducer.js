import { combineReducers } from 'redux';
import user from './reducers/user';
import sets from './reducers/sets';
import languages from './reducers/languages';

export const rootReducer = combineReducers({
    user,
    sets,
    languages
});
