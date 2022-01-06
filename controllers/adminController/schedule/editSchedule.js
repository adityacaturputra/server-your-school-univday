const Schedule = require('../../../models/Schedule');

module.exports = async (req, res) => {
  try {
    const {
      scheduleId, name, timeStartDate, timeEndDate,
    } = req.body;
    const schedule = await Schedule.findOne({ _id: scheduleId });
    schedule.name = name;
    if (!req.session.user.universityId) {
      schedule.timeStartDate = timeStartDate;
      schedule.timeEndDate = timeEndDate;
    }
    await schedule.save();
    req.flash('alertMessage', 'Success update Schedule');
    req.flash('alertStatus', 'success');
    res.redirect('/admin/schedule');
    return;
  } catch (error) {
    console.log(error);
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/schedule');
  }
};
