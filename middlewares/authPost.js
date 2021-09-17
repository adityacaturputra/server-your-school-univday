const isAllow = (req, res, next) => {
    if(!req.session.user.roleId || req.session.user.roleId === req.body.universityId || req.session.user.roleId === req.params.universityId){
        next()
    } else {
        req.flash('alertMessage', 'Role kamu nggak cocok tadi. Jadi nggak diizinkan.')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/dashboard')
    }
}

module.exports = isAllow