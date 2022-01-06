const isAllow = (req, res, next) => {
  if (
    !req.session.user.universityId
     || req.session.user.universityId === req.body.universityId
     || req.session.user.universityId === req.params.universityId
  ) {
    next();
  } else {
    req.flash('alertMessage', 'Role kamu nggak cocok tadi. Jadi nggak diizinkan.');
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/dashboard');
  }
};

module.exports = isAllow;
