
const userDocument = require('../models/Users')
const jwt =  require('../utils/jwt')

const dummyToken = {
    /**
     * Creates a Dummy Token
     * @returns {String} A JWT Token
     */
    async create(){
        const dummyUser = await userDocument.find({})
        const rawToken = {
            username: dummyUser[0].username,
            id: dummyUser[0]._id
        }
        const uid = dummyUser[0]._id
        const token = await jwt.signToken(rawToken)
        return { token, uid }
    },
    /**
     * Verifies the passed token
     * @param {string} token the session token of the logged user
     * @returns {Object} The data object from the JWT Token
     */
    async verify(token){
        let { payload } =  await jwt.verifyToken(token)
        return payload
    }
}
module.exports = dummyToken