exports.mapPlayer = (input) => {
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