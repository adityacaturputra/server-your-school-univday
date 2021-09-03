const isLogin = (req, res, next) => {
    if(req.session.user == null || req.session.user == undefined) {
        req.flash('alertMessage', 'Session telah habis silakan signin kembali')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/signin')
    }else {
        var hour = 3600000
        req.session.cookie.expires = new Date(Date.now() + hour)
        next()
    }
}

module.exports = isLogin