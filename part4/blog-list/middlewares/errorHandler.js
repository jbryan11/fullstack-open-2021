module.exports = function (err, req, res, next) {
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    } else if (err.name === 'JWSSignatureVerificationFailed') {
        return res.status(401).json({
            error: 'invalid token'
        })
    } else if (err.name === 'JWTExpired') {
        return res.status(401).json({
            error: 'Session Token expired'
        })
    }

    next(err)
}