import axios, { handleError, handleResponse } from "./client";

export const getExampleMatches = async () => {
  return axios.get("matchgame/example").then(handleResponse).catch(handleError);
};

export const getStadiums = async () => {
  return axios.get("stadium/index").then(handleResponse).catch(handleError);
};

export const getTeams = async () => {
  return axios.get("team/index").then(handleResponse).catch(handleError);
};

export const getMatchgame = async (matchgameId) => {
  return axios
    .get("matchgame/show/" + matchgameId)
    .then(handleResponse)
    .catch(handleError);
};

export const getMatchTickets = async (matchgameId) => {
  return axios
    .get("ticket/matchtickets/" + matchgameId)
    .then(handleResponse)
    .catch(handleError);
};

export const getStadiumZones = async (stadiumId) => {
  return axios
    .get("zone/stadiumzones/" + stadiumId)
    .then(handleResponse)
    .catch(handleError);
};

export const getMatchesBy = async (filterParams) => {
  return axios
    .get("matchgame/matchesby" + filterParams)
    .then(handleResponse)
    .catch(handleError);
};

export const postCheckout = async (cartData) => {
  return axios
    .post("order/checkout", JSON.stringify(cartData))
    .then(handleResponse)
    .catch(handleError);
};
