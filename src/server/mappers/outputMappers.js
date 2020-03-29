const mapPlayer = (input) => {
  const player = {
    position: {
      x:input.position.x,
      y:input.position.y
    },
    story:{
      step:input.story.step
    }
  }
  return player
}
exports.mapPlayer = mapPlayer;

exports.mapPlayers = (inputs) => {
  let players = [];
  inputs.forEach(input => {
    players.push(mapPlayer(input))
  });
  return players
}