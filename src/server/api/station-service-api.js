var axios = require("axios");
import { mapPlayer, mapPlayers } from '../mappers/outputMappers';

const authApi = axios.create({
  baseURL: 'https://project-helios.eu.auth0.com',
  timeout: 1000,
  headers: { 'content-type': 'application/json' }
});

const stationServiceApi = axios.create({
  baseURL: process.env.STATION_API_URL,
  timeout: 1000,
  headers: { 'content-type': 'application/json' }
});

export async function getToken() {
  return authApi.post('/oauth/token', {
    client_id: process.env.BFF_CLIENT_ID,
    client_secret: process.env.BFF_CLIENT_SECRET,
    audience: 'helios-station-service-local',
    grant_type: "client_credentials"
  })
    .then(response => {
      const token = response.data;
      stationServiceApi.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
      authApi.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
      return response.data;
    })
    .catch(error => {
      console.log(error)
    })
}

export async function getStations() {
  return stationServiceApi.get('/stations')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error)
    })
}

export async function createStation(station) {
  return stationServiceApi.post('/stations',station)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error)
    })
}