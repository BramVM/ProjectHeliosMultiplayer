Description
==============
A javascript-only - sandbox - space - survival - exploring - crafting - trading - managing - multyplayer - browser game. The idea is to create a browser game that is desinged to be very open for new features.

Get started
==============
- Clone this repository
- Make sure node is installed
- Install all node packeges (open therminal, go to the repository file-location and type "npm install")
- Then type "node start" or "node run debug" to start the server and serve the web page on localhost.
- Open your browser and go to "http://localhost:5000". Note: the port might change during development but the node script will tell you which port it is served on.

Dependencies (need to rewrite this)
==============
The game is written in one language (javascript) used on both, server and client. This is why server and client can share the same code. 
As a server we use node.js to:
-bundle the gameCore javascript files to a single js file (to use in index.html on clients)
-uglyfy & minify this js file.
-uses http to serve index.html
-run an instance of our game wich uses socket.io for realtime connection between this instance and those on the clients.
On the client we use a single html page with a single canvas-element as output for our game and basic document event listeners as input for our game. 

Documentation
==============
Highlevel explenation for understanding the game-concept
--------------
https://socket.io/
- Each client and the node server runs an instance of the game (gameCore).
- Some code in the gameCore only runs on the client and some only on the server.
- Userinput is caught by the client, used directly in its own instance (for smooth visuals and reaction time) and is sent to the server.
- The server instance sends an updatePackage to each client instance at the end of each its gameloop. (the loop of the server is at a lower frequency)
- During each client gameloop it checks for new update packages from the server and resets all relevant gamestate variables to how they are on the server (using the package).
- Since client and server loops run at diffrent freequencies, all speed is calculated in pixels per seconds instead of pixels per frame. Do do this, we first get the delta time between each frame in sec and multiply movement by this number. (istead of doin something like this: x=x+speed, we do this: x=x+speed*dt, where dt is delta time)

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

Usefull links/sources
==============
https://github.com/underscorediscovery/realtime-multiplayer-in-html5
https://github.com/mrdoob/three.js/

