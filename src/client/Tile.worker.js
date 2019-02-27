import Tile from './Tile'

self.onmessage = function (event) {
  var message = event.data;
  if (message.type === "request_tile") {
    var tile = new Tile(message.gridIndex)
    self.postMessage({ type: 'add_tile', tile })
  }
};