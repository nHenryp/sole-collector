const isSignedIn = (req, res, next) => {
    if (req.session.user) {
        console.log('user authenticated')
        return next()
    }
    console.log('user is not authenticated')
    res.redirect('/auth/sign-in')
}
module.exports = isSignedIn