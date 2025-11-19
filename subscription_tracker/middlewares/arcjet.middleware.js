import aj from '../config/arcjet.js'

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.writeHead(429, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'Too Many Requests' }))
            } else if (decision.reason.isBot()) {
                res.writeHead(403, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'No bots allowed' }))
            } else {
                res.writeHead(403, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'Forbidden' }))
            }
        }

        next()
    } catch (error) {
        console.log(`Arcjet middleware error: ${error}`)
        next(error)
    }
}

export default arcjetMiddleware
