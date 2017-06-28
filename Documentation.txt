Get started:
-download repository
-install node on your pc
-npm install
-"node start" or "node run debug" to start the server and localy serve the web page.

Used technology:
The game is written in one language (javascript) used on both, server and client. This is why server and client can share the same code. 
As a server we use node.js to:
-bundle the gameCore javascript files to a single js file (to use in index.html on clients)
-uglyfy & minify this js file.
-uses http to serve index.html
-run an instance of our game wich uses socket.io for realtime connection between this instance and those on the clients.
On the client we use a single html page with a single canvas-element as output for our game and basic document event listeners as input for our game. 

Very high level design for the game:
-Each client and the node server runs an instance of the game (gameCore).
-Some code in the gameCore only runs on the client and some only on the server.
-Userinput is caught by the client, used directly in its own instance (for smooth visuals and reaction time) and is sent to the server.
-The server instance sends ab updatePackage to each client instance at the end of each server gameloop. (the loop of the server is at a lower frequency)
-During each client gameloop it checks for new update packages from the server and resets all relevant gamestate variables to how they are on the server (using the package).
-Since client and server loops run at diffrent freequencies, all speed is calculated in pixels per seconds instead of pixels per frame. Do do this, we first get the delta time between each frame in sec and multiply movement by this number. (istead of doin something like this: x=x+speed, we do this: x=x+speed*dt, where dt is delta time)

Client loop:
-check if the server sent us a new update-package and if soo reset gamestate to this
-If this user changed the gamestate variables using the userinterface(pressing buttons), apply these directly to current gamestate.
-calculate new gamestate based on the input varaibles. (this is where we code our game)
-Update the visuals (redraw canvas based on gamestate)

Server loop:
-calculate new gamestate based on the input varaibles.
-make and sent update package to clients
Note: For now client input is sent to the server using eventhandelers (outside of the gameloop).

Notes to self:
Performance issue collision of bullets.
Checking for collision of every bullet with anything on each frame tick consumes alot of resources. (to much)
improvement idea: predict wich target might get hit and onely check for collision with those targets
improvement idea: on fire predict if and when the bullet is going to hit something based on known variables and update the prediction when those variables change. (tricky to predict, do we know all needed variables?)
improvement idea: change the gameplay and combatSystem so fire always requires target lockon and bullets are just fast cosmetic particles