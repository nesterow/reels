## Slot Machine
Simple slot machine simulation written with [preact](https://preactjs.com/)

[Preview](https://nesterow.github.io/reels/dist/index.html)

## Foreword
For this task I wanted to try new technologies (new for me). I picked following stack:  
1. [preact](https://preactjs.com/) - js library
2. [redux](https://redux.js.org) - centralized state
3. TypeScript

I've decided to implement all effects with pure CSS and write app without using canvas or svg. As a matter of fact, in real conditions I would use a game engine for such a project to keep codebase consistent and maintanable.

## Implementation notes

- Rotation effect was inpired by [this snippet](https://codepen.io/studiojvla/pen/qVbQqW)
- I assumed that a real app would use a game server. So part of the logics is implemented as server mocks, for example a *spin request*. I also assumed that the spin requests would be a promise based function whether it communicates trough a rest api or websockets.
- In my implementation the server returns only *first reels positions* of the target slot state and rewards information
- The test application ois emulating initial get request to pick up assets from the server.
- The reel symbols are enumerated in order (0 to 4) for simplicity. 
- I used *Matricies* as main data structures
- The animation series are controlled by CSS's `animation-delay` property
- I didn't have time to do pretty styles or writing a maintanable code. The code you see here is at my worst.
- I didn't write unit tests in this case because I am limited in time. 

## Other links
Checkout my Node.JS skills and more clean code written by me:
- [A Test for BE devs](https://github.com/nesterow/redis_proxy/) 
- [An Isomorphic Web App](https://github.com/nesterow/frontless)

