require('dotenv').config()

async function auth(request, reply) {
    const apiKey = request.headers['x-api-key']
    const knowKey = process.env.APIKEY

    if (!apiKey || apiKey !== knowKey) {
        return reply.code('401').send({error:'Некорректный токен.'})
    }
}

module.exports = auth