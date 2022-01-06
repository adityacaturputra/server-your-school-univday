const Schedule = require('../../../models/Schedule');

module.exports = async (req, res) => {
  try {
    const {
      name, universityId, timeStartDate, timeEndDate,
    } = req.body;
    const { userUniversityId } = req.session.user;
    if (!userUniversityId) {
      await Schedule.create({
        name, universityId, timeStartDate, timeEndDate,
      });
      req.flash('alertMessage', 'Success add Schedule');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/schedule');
      return;
    }
    req.flash('alertMessage', 'Failed add Schedule : hanya bagi admin utama');
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/schedule');
    return;
  } catch (error) {
    console.log(error);
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/schedule');
  }
};
