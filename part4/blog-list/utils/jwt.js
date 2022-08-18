const jose = require('jose')
const { PRIVATE_KEY, PUBLIC_KEY } = require('./keypairs')

const jwt = {
    async signToken(payload){
        return await new jose.SignJWT(payload).setProtectedHeader({ alg: 'ES256' }).setExpirationTime('24h').sign(PRIVATE_KEY)
    },
    async verifyToken(token){
        return await jose.jwtVerify(token, PUBLIC_KEY)
    }
}
module.exports = jwt