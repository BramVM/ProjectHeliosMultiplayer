Description
==============
A javascript - multyplayer - procedurally generated - sandbox - space - survival - exploring - crafting - trading - managing - browser gameproject. The idea is to create a modular browser game  that is desinged to be very open for new features. Find latest build here as demo: https://projectheliosremake.herokuapp.com/

Get started
==============
- Clone/download this repository
- Make sure node is installed
- Install all node packeges ("npm install")
- Buld and run the project ("npm start")
- Open your browser and go to "http://localhost:3000". Note: the port might change during development but the node script will tell you which port it is served on.

Basic Documentation
==============

Highlevel understanding of the game-concept
--------------
- Both the server and the client source is included in this project.
- The game is written in one language (javascript) used on both, server and client. This is why server and client can share source files.
- Each client and the node server runs an instance of the game.
- Userinput is caught by the client, used directly in its own gameInstance (for smooth visuals and reaction time) and is sent to the server over websocket.
- The server instance sends an updatePackage to each client instance at the end of each its gameloop. (the loop of the server is at a lower frequency)
- During each client gameloop it checks for new update packages from the server and resets all relevant gamestate variables to how they are on the server (using the package).
- Since client and server loops run at diffrent freequencies, all speed is calculated in pixels per seconds instead of pixels per frame. To do this, we first get the delta time between each frame and multiply movement by this number. (istead of doing something like this: x=x+speed, we do this: x=x+speed*dt, where dt is delta time)
- On client-side we use a single html page with a single canvas-element as output and basic javascript document event listeners as input.
