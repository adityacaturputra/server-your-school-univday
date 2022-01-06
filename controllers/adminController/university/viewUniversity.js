const University = require('../../../models/University');

module.exports = async (req, res) => {
  try {
    let university;
    if (req.session.user.universityId !== null) {
      university = await University.find({ _id: req.session.user.universityId })
        .populate({ path: 'imageId', select: 'id imageUrl' });
    } else {
      university = await University.find()
        .populate({ path: 'imageId', select: 'id imageUrl' });
    }
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    res.render('admin/University/view_university', {
      title: 'Univday | University', alert, university, user: req.session.user,
    });
  } catch (error) {
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/dashboard');
  }
};
