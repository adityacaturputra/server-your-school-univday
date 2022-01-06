const Schedule = require('../../../models/Schedule');
const University = require('../../../models/University');

module.exports = async (req, res) => {
  try {
    let schedule;
    // let university;
    // if (req.session.user.universityId !== null) {
    // eslint-disable-next-line max-len
    //   schedule = await Schedule.find({ universityId: req.session.user.universityId }).populate({ path: 'universityId', select: '_id name' });
    //   university = await University.find({ _id: req.session.user.universityId });
    // } else {
    //   schedule = await Schedule.find().populate({ path: 'universityId', select: '_id name' });
    //   university = await University.find();
    // }
    schedule = await Schedule.find().populate({ path: 'universityId', select: '_id name' });
    const university = await University.find();
    schedule = schedule.sort((a, b) => Date.parse(a.timeStartDate) - Date.parse(b.timeStartDate));
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    res.render('admin/schedule/view_schedule', {
      title: 'Univday | Schedule', alert, schedule, university, user: req.session.user,
    });
  } catch (error) {
    console.log(error);
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/dashboard');
  }
};
