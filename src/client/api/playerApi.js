import { Get } from './authorizedRequest';
import { mapPlayer } from '../mappers/playerMapper';

export async function getPlayers() {
  const request = Get('players');
  const response = await fetch(request);
  if (!response.ok) {
    let err;
    try {
      err = await response.json();
    } catch {
      throw new Error(response.statusText);
    }
    throw err;
  }
  return response.json();
}

export async function getPlayer() {
  const request = Get('active-player');
  const response = await fetch(request);
  if (!response.ok) {
    let err;
    try {
      err = await response.json();
    } catch {
      throw new Error(response.statusText);
    }
    throw err;
  }
  return response.json();
}
