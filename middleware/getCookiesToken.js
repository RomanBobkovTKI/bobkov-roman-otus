const Token = require('../models/token')

module.exports.tokenMiddlware = async (req, _, next) => {
    // Получение значения из cookie
    const authToken = await req.cookies['AuthToken']

    // Добавление авторизованного пользователя в запрос
    req.user = authToken;
    next();
};