const {https} = require('firebase-functions')
const {default: next} = require('next')

// const isDev=

const server = next({
    dev: false,
    conf:{distDir: '.next'}
})

const nextjsHandler = server.getRequestHandler();
exports.nextServer=https.onRequest((req, res) =>{
    return server.prepare()
    .then(()=>{
        return nextjsHandler(req,res)
    })
})