module.exports = (res, error, renderPage, protected, ...someParams) => {
    
    res.render(`${renderPage}`, {
            isProtected: protected,
            message: `${error}`,
            messageClass: 'alert-success',
            allCourses: someParams.allCourses,
            allLessons: someParams.allLessons
    })
    
}