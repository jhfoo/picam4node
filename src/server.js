const fs = require('fs'),
    picam4node = require('./picam4node.js'),
    cam = new picam4node.StillCamera()


cam.takeImage({
    shutterspeed: 80000,
    width: 800,
    height: 600
}).then((data) => {
    console.log(data)
    fs.writeFileSync('photo.jpg', data)
}).catch((err) => {
    console.log('ERROR: ', err)
})
console.log('Hello')