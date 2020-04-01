import { SETS_FETCHED } from "../types";
import api from "../api";

export const setsFetched = data => ({
  type: SETS_FETCHED,
  data
});

/*AUTH SETS*/
export const fetchUserSet = id => () => api.authSets.fetchUserSet(id);

export const fetchSets = () => dispatch =>
  api.authSets.fetchSets().then(data => dispatch(setsFetched(data)));

export const createSet = set => dispatch =>
  api.authSets.createSet(set).then(data => dispatch(setsFetched(data)));

export const editSet = set => dispatch =>
  api.authSets.editSet(set).then(data => dispatch(setsFetched(data)));

export const removeSet = id => dispatch =>
  api.authSets.removeSet(id).then(data => dispatch(setsFetched(data)));

/*NON AUTH SETS*/
export const fetchGuestSet = id => () => api.sets.fetchGuestSet(id);
