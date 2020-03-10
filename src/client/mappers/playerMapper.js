export function mapPlayer(player) {
  return {
    ...player,
    id : player._id
  };
}