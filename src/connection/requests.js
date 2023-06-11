import axios from "./client";

export const getExampleMatches = async () => {
  return axios.get("matchgame/example");
};

export const getStadiums = async () => {
  return axios.get("stadium/index");
};

export const getTeams = async () => {
  return axios.get("team/index");
};

export const getMatchgame = async (matchgameId) => {
  return axios.get("matchgame/show/" + matchgameId);
};

export const getMatchTickets = async (matchgameId) => {
  return axios.get("ticket/matchtickets/" + matchgameId);
};

export const getStadiumZones = async (stadiumId) => {
  return axios.get("zone/stadiumzones/" + stadiumId);
};

export const getMatchesBy = async (filterParams) => {
  return axios.get("matchgame/matchesby" + filterParams);
};

export const postCheckout = async (cartData) => {
  return axios.post("order/checkout", JSON.stringify(cartData));
};

export const getCartTickets = async (cartData) => {
  return axios.post("/ticket/carttickets", JSON.stringify(cartData));
};

export const logInSubmission = async (userData) => {
  return axios.post("/auth/login", JSON.stringify(userData));
};

export const registerSubmission = async (userData) => {
  return axios.post("/auth/register", JSON.stringify(userData));
};
