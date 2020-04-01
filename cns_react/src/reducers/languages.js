import { LANGUAGES_FETCHED, USER_LOGGED_OUT } from "../types";

export default function languages(state = {}, action = {}) {
  switch (action.type) {
    case LANGUAGES_FETCHED:
      return { items: action.data, fetched: true };
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}
