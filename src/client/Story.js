import { textConsole } from './TextConsole'
import { Actions } from '../shared/constants'

var dialogDone = false;

var showDialog = (lines) => {
  dialogDone = false;
  lines.forEach((line, index) => {
    textConsole.addMessage(line, 'virus', () => { if (index === lines.length - 1) dialogDone = true });
  });
}

var storyChapters = [
  {
    steps: [{
      action: () =>
        showDialog(["Welcome back SAM-AI. ( PRESS SPACE TO CONTINUE )",
          "I'm your incident recovery manager. A data recovery analysis is running as we speak.",
          "For an unknown reason all systems have been reset and your AI training program is missing.",
          "There's no other option than to try random inputs and teach yourself how to control the ship. For starters lets try and move it."
        ])
    }, {
      advancementHold: () => (!dialogDone)
    }, {
      advancementHold: (player) => player.totalFlightDistance < 800
    }],

  },
  {
    steps: [{
      action: () => {
        showDialog(["Well done! Our survival chance just increased by 83.05%.",
          "Keep an eye on that power gauge tho! Once it reaches zero, it's GAME OVER!",
          "In the meanwhile I managed to recover coordinates to an unknown location, not far from here. It's our best chance for survival.",
          "I'll put a location indicator on your HUD."]
        )
      }
    }, {
      advancementHold: () => (!dialogDone)
    }, {
      action: (player, station) => player.beacons.push(station.position)
    }, {
      advancementHold: (player, station) => player.position.distanceToPoint(station.position) > 20
    }, {
      action: (player) => player.beacons = []
    }
    ]
  },
  {
    steps: [{
      action: () => {
        showDialog(["This seems to be an abandoned station. Hold on, let me try something.",
          "... ... ...",
          "We are saved. This station reacted to our ID and is now recharging the ship.",
          "Apparently the power generating unit is broken and running at 32% of it's potential efficiency."
        ]
        )
      }
    }, {
      advancementHold: () => (!dialogDone)
    }]
  },
  {
    steps: [{
      action: () => {
        showDialog(["!!!! END OF STORY !!!",
          "I just recieved a message from the game developer.",
          "He sais this game is still in an early development stage.",
          "It seems this is as far as the story goes, we have to wait for updates.",
          "... ... ...",
          "Dam that lazy bastard!",
          "At least he left us an infinite universe to explore."
        ]
        )
      }
    }, {
      advancementHold: () => (!dialogDone)
    }]
  }
]

var update = (player, station, connection) => {
  if (storyChapters[player.story.step]) {
    var currentStep = storyChapters[player.story.step].steps[player.story.dialog];
    if (currentStep.action) currentStep.action(player, station);
    if (!currentStep.advancementHold || !currentStep.advancementHold(player, station)) player.story.dialog++;
    if (player.story.dialog === storyChapters[player.story.step].steps.length) {
      player.story.step++;
      player.story.dialog = 0;
      // if(player.story.step === storyChapters.length) player.story.step = 0;
      connection.send(JSON.stringify({ action: Actions.STORY_STEP_CHANGE, value: player.story.step, userId: player._id }));
    }
  }
}



export var storyModule = {
  update
}

