module.exports.requireAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.render('login', {
            message: 'Авторизуйтесь чтобы продолжить',
            messageClass: 'alert-danger',
            isProtected: false
        });
    }
}

