const Token = require('../models/token')

module.exports.tokenMiddlware = async (req, _, next) => {
    // Получение значения из cookie
    const user = await req.cookies['AuthToken']

    // Добавление авторизованного пользователя в запрос
    req.user = user;
    next();
};