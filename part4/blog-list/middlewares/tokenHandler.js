const jose = require('jose')
const { PUBLIC_KEY } = require('../utils/keypairs')
function extractTokenFromHeader(authorization) {
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}
async function decodeToken(token){
    let { payload }= await jose.jwtVerify(token, PUBLIC_KEY)
    return payload
}
const sessionToken = {
    passTokenToRequest(request,response,next){
        request.token = extractTokenFromHeader(request.headers.authorization)
        next()
    },
    async passUserToRequest(request,response,next){
        if(!request.token){
            return response.status(401).json({ error: 'missing or invalid token' })
        }
        request.user = await decodeToken(request.token)
        next()
    }
}

module.exports = sessionToken