const Schedule = require('../../../models/Schedule');

module.exports = async (req, res) => {
  try {
    const {
      scheduleId, name, timeStartDate, timeEndDate, place,
    } = req.body;
    const schedule = await Schedule.findOne({ _id: scheduleId });
    schedule.name = name;
    schedule.place = place;
    if (!req.session.user.universityId) {
      if (timeStartDate) {
        schedule.timeStartDate = timeStartDate;
      }
      if (timeEndDate) {
        schedule.timeEndDate = timeEndDate;
      }
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
