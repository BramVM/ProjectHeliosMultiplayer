import {
  drawConsole
} from './CanvasDrawer'

var wordIndex = 0;
var wordSpeed = 0.5;
var blinkSpeed = 0.1;
var showMore = false;
var storedText = '';
var messageQueue = [];
var holdState = false;
var resumeState = false;
var avatar = null;
var callback = null;
var tick = 0;

var addMessage = (text, avatar, callback) => {
  if (text) messageQueue.push({ text, avatar, callback });
}

var hold = (value) => {
  holdState = value;
}

var resume = () => {
  resumeState = true;
}

var render = (intensity) => {
  if (storedText === '' && messageQueue.length > 0) {
    storedText = messageQueue[0].text;
    avatar = messageQueue[0].avatar;
    callback = messageQueue[0].callback;
    messageQueue.splice(0, 1);
  }
  if (storedText != '') {
    tick = tick + blinkSpeed;
    var blink = Math.round(tick) % 2 === 0 ? true : false;
    var consoleDrawer = drawConsole(storedText, Math.round(wordIndex), intensity, showMore, avatar, blink);
    if (consoleDrawer.done) {
      showMore = true;
      if (resumeState) {
        resumeState = false;
        showMore = false;
        wordIndex = 0;
        storedText = storedText.slice(consoleDrawer.charsProccessed, storedText.length);
        if (storedText.length <= 0) {
          avatar = null;
          if (callback) callback();
        }
      }
    }
    else {
      if (!holdState && !consoleDrawer.done) wordIndex = wordIndex + wordSpeed;
    }
  }
  return consoleDrawer;
}

export var textConsole = {
  render,
  addMessage,
  hold,
  resume
}

