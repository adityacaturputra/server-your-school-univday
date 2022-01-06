const Schedule = require('../../../models/Schedule');
const University = require('../../../models/University');

module.exports = async (req, res) => {
  try {
    let schedule;
    let universities;
    if (req.session.user.universityId !== null) {
      schedule = await Schedule.find({ universityId: req.session.user.universityId }).populate({ path: 'universityId', select: '_id name' });
      universities = await University.find({ _id: req.session.user.universityId });
    } else {
      schedule = await Schedule.find().populate({ path: 'universityId', select: '_id name' });
      universities = await University.find();
    }
    console.log(schedule);
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    res.render('admin/schedule/view_schedule', {
      title: 'Univday | Schedule', alert, schedule, university: universities, user: req.session.user,
    });
  } catch (error) {
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/dashboard');
  }
};
