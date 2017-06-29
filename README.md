Description
==============
A javascript - multyplayer - sandbox - space - survival - exploring - crafting - trading - managing - browser gameproject. The idea is to create a modular browser game  that is desinged to be very open for new features.

Get started
==============
- Clone this repository
- Make sure node is installed
- Install all node packeges (open therminal, go to the repository file-location and type "npm install")
- Then type "node start" or "node run debug" to start the server and serve the web page on localhost.
- Open your browser and go to "http://localhost:5000". Note: the port might change during development but the node script will tell you which port it is served on.

Documentation
==============

NodeServer script explained
--------------
- Bundles the javascript game-files to a single js file (to use in index.html on clients)
- Uglyfies & minifies this bundeled js file.
- Uses http to serve index.html
- Run an instance of our game wich uses socket.io for realtime connection between this instance and those run by clients.

Highlevel understanding of the game-concept
--------------
- The game is written in one language (javascript) used on both, server and client. This is why server and client can share the same prototypes.
- Each client and the node server runs an instance of the game (gameCore).
- Userinput is caught by the client, used directly in its own instance (for smooth visuals and reaction time) and is sent to the server.
- The server instance sends an updatePackage to each client instance at the end of each its gameloop. (the loop of the server is at a lower frequency)
- During each client gameloop it checks for new update packages from the server and resets all relevant gamestate variables to how they are on the server (using the package).
- Since client and server loops run at diffrent freequencies, all speed is calculated in pixels per seconds instead of pixels per frame. Do do this, we first get the delta time between each frame in sec and multiply movement by this number. (istead of doin something like this: x=x+speed, we do this: x=x+speed*dt, where dt is delta time)
- On client-side we use a single html page with a single canvas-element as output and basic javascript document event listeners as input.

Client loop explained
--------------
- Check if the server sent us a new update-package and if soo reset gamestate to this
- If this user changed the gamestate variables using the userinterface(pressing buttons), apply these directly to current gamestate.
- Calculate new gamestate based on the input varaibles. (this is where we code our game)
- Update the visuals (redraw canvas based on gamestate)

Server loop explained
--------------
- Calculate new gamestate based on the input varaibles.
- Make and sent update package to clients
Note: For now client input is sent to the server using eventhandelers (outside of the gameloop).

Dependencies
--------------
https://socket.io/
 
Usefull links/sources
==============
- https://github.com/underscorediscovery/realtime-multiplayer-in-html5
- https://github.com/mrdoob/three.js/

