# picam4node
Buffer + Promise-based (no file writes) interface to Pi camera for Node.js

## What's different from the other Node.js Pi camera libraries?
1. You have full access to raspistill functionality.
2. No file writes; improves lifespan of your SD card for long-running camera monitor.

## What's similar to other Node.js Pi camera libraries?
Images taken off raspistill; I am not aware of existing libraries connecting directly to the Pi camera.

## Acknowledgements
Referenced heavily from [servall/pi-camera-connect](https://github.com/servall/pi-camera-connect)
