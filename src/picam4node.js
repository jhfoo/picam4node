const {
    spawn
} = require('child_process')

const DefaultImageArgs = {
        '-t': 1,
        '-o': '-',
        '-n': null,
        '-ss': 5 * 10000
    },
    FriendlyArgNames = {
        shutterspeed: '-ss',
        width: '-w',
        height: '-h'
    }

function StillCamera() {

}

StillCamera.prototype.takeImage = async function (args, options) {
    return new Promise((resolve, reject) => {
        const childProcess = spawn('raspistill', this.parseArgs(args), options)

        let stdoutData = Buffer.alloc(0)
        let stderrData = Buffer.alloc(0)

        childProcess.once("error", (err) => reject(err))

        childProcess.stdout.on("data", (data) => stdoutData = Buffer.concat([stdoutData, data]))
        childProcess.stdout.once("error", (err) => reject(err))

        childProcess.stderr.on("data", (data) => stderrData = Buffer.concat([stderrData, data]))
        childProcess.stderr.once("error", (err) => reject(err))

        childProcess.stdout.on("close", () => {

            if (stderrData.length > 0)
                return reject(new Error(stderrData.toString()))

            return resolve(stdoutData)
        })
    })
}

StillCamera.prototype.parseArgs = function (args) {
    // clone defaults
    let FinalArgs = {}
    Object.keys(DefaultImageArgs).forEach((key) => {
        FinalArgs[key] = DefaultImageArgs[key];
    })

    // overwrite defaults with params in args if any
    Object.keys(args).forEach((key) => {
        // check if key is a friendly name
        if (key in FriendlyArgNames) {
            FinalArgs[FriendlyArgNames[key]] = args[key]
        } else {
            // set key as-is
            FinalArgs[key] = args[key]
        }
    })

    // console.log(FinalArgs)
    return Object.keys(FinalArgs).reduce((acc, key) => {
        acc.push(key)
        if (FinalArgs[key] != null)
            acc.push (FinalArgs[key])
        
        return acc
    }, [])
}

exports.StillCamera = StillCamera