# picam4node
Buffer + Promise-based (no file writes) interface to Pi camera for Node.js

## Install
~~~ sh
npm i -S picam4node
~~~

### What's different from the other Node.js Pi camera libraries?
1. You have full access to raspistill functionality.
2. Outputs to Buffer object. No file writes; improves lifespan of your SD card for long-running camera monitor.

### What's similar to other Node.js Pi camera libraries?
Images taken off raspistill (stock Raspbian binary); I am not aware of existing libraries connecting directly to the Pi camera.

### Basic Usage
```js
const fs = require('fs'),
    picam4node = require('./picam4node.js'),
    cam = new picam4node.StillCamera()

cam.takeImage({
    shutterspeed: 80000, /* or '-ss': 80000, */
    width: 800, /* or '-w': 800, */
    height: 600
}).then((data) => {
    console.log(data)
    fs.writeFileSync('photo.jpg', data)
}).catch((err) => {
    console.log('ERROR: ', err)
})
```

## Acknowledgements
Referenced heavily from [servall/pi-camera-connect](https://github.com/servall/pi-camera-connect)
