var axios = require("axios");
import { mapPlayer, mapPlayers } from '../mappers/outputMappers';

const authApi = axios.create({
  baseURL: 'https://project-helios.eu.auth0.com',
  timeout: 1000,
  headers: { 'content-type': 'application/json' }
});

const playerServiceApi = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
  headers: { 'content-type': 'application/json' }
});

export async function getToken() {
  return authApi.post('/oauth/token', {
    client_id: "25WF2n6B6ZOWHfi2DXRTBPvh6BpNXwps",
    client_secret: "51SHrq9WMPs7JqQR5DB-hW05ia5FyK93LNB63jWFRG0qSaakEXEAfGUQWHtJieAy",
    audience: process.env.CLIENT_ID,
    grant_type: "client_credentials"
  })
    .then(response => {
      const token = response.data;
      playerServiceApi.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
      authApi.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
      return response.data;
    })
    .catch(error => {
      console.log(error)
    })
}

export async function getPlayers() {
  return playerServiceApi.get('/players')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error)
    })
}

export async function updatePlayer(player) {
  return playerServiceApi.patch('/players/' + player._id , mapPlayer(player))
    .catch(error => {
      console.log(error)
    })
}

export async function updatePlayers(players) {
  return playerServiceApi.patch('/players' , mapPlayers(players))
    .catch(error => {
      console.log(error)
    })
}