import { LANGUAGES_FETCHED } from "../types";
import api from "../api";

export const languagesFetched = data => ({
    type: LANGUAGES_FETCHED,
    data
});

export const fetchLanguages = () => dispatch => 
    api.languages.fetchLanguages()
        .then(data => dispatch(languagesFetched(data)));
                      
