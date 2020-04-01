import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.answer),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data })
  },
  authSets: {
    fetchSets: () => axios.post("/api/authSets").then(res => res.data.sets),
    createSet: set =>
      axios.post("/api/authSets/createSet", { set }).then(res => res.data.sets),
    editSet: set =>
      axios.post("/api/authSets/editSet", { set }).then(res => res.data.sets),
    removeSet: id =>
      axios.post("/api/authSets/removeSet", { id }).then(res => res.data.sets),
    fetchUserSet: id =>
      axios.post("/api/authSets/fetchUserSet", { id }).then(res => res.data.set)
  },
  sets: {
    fetchGuestSet: id =>
      axios.post("/api/sets/fetchGuestSet", { id }).then(res => res.data.set),
    fetchGuestSets: lang =>
      axios
        .post("/api/sets/fetchGuestSets", { lang })
        .then(res => res.data.sets)
  },
  languages: {
    fetchLanguages: () =>
      axios.post("/api/languages").then(res => res.data.languages)
  },
  doingStuff: {
    verifyRank: () => axios.post("/api/doingStuff").then(res => res.data.rank),
    addNewLanguage: lang =>
      axios
        .post("/api/doingStuff/addNewLanguage", { lang })
        .then(res => res.data.languages),
    removeLanguage: languageName =>
      axios
        .post("/api/doingStuff/removeLanguage", { languageName })
        .then(res => res.data.languages),
    fetchSets: lang =>
      axios
        .post("/api/doingStuff/fetchSets", { lang })
        .then(res => res.data.sets),
    removeSet: (setID, lang) =>
      axios
        .post("/api/doingStuff/removeSet", { setID, lang })
        .then(res => res.data.sets),
    fetchSet: setID =>
      axios
        .post("/api/doingStuff/fetchSet", { setID })
        .then(res => res.data.set),
    editSet: set =>
      axios.post("/api/doingStuff/editSet", { set }).then(res => res.data.set),
    createSet: set =>
      axios.post("/api/doingStuff/createSet", { set }).then(res => res.data.set)
  }
};
