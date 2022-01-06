const Schedule = require('../../../models/Schedule');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.session.user.universityId) {
      await Schedule.findByIdAndRemove(id);
      req.flash('alertMessage', 'Success update Schedule');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/schedule');
      return;
    }
    req.flash('alertMessage', 'Role anda belum diizinkan untuk mendelete ini');
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/schedule');
  } catch (error) {
    console.log(error);
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/schedule');
  }
};
