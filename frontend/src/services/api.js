import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tournaments
export const getTournaments = () => api.get('/tournaments/').then(res => res.data);
export const getTournament = (id) => api.get(`/tournaments/${id}/`).then(res => res.data);
export const getTournamentSquad = (id) => api.get(`/tournaments/${id}/squad/`).then(res => res.data);

// Players
export const getPlayers = () => api.get('/players/').then(res => res.data);
export const getPlayer = (id) => api.get(`/players/${id}/`).then(res => res.data);
export const getBatsmen = () => api.get('/players/batsmen/').then(res => res.data);
export const getBowlers = () => api.get('/players/bowlers/').then(res => res.data);

export default {
  getTournaments,
  getTournament,
  getTournamentSquad,
  getPlayers,
  getPlayer,
  getBatsmen,
  getBowlers,
};