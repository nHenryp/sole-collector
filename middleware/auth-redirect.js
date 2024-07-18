const authRedirect = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/users/profile')
    } else {
        next()
    }
}
module.exports = authRedirect