const isSuperAdmin = (req, res, next) => {
    if(!req.session.user.roleId){
        next()
    } else {
        req.flash('alertMessage', 'Role kamu nggak cocok tadi, jadi nggak diizinkan. Hanya boleh untuk admin utama.')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/user')
    }
}

module.exports = isSuperAdmin