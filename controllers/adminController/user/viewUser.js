const Users = require('../../../models/Users');
const University = require('../../../models/University');

module.exports = async (req, res) => {
  try {
    const users = await Users.find()
      .populate({ path: 'universityId', select: '_id name' });
    const university = await University.find();
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    res.render('admin/member/view_member', {
      title: 'Univday | User', alert, users, university, user: req.session.user,
    });
  } catch (error) {
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/dashboard');
  }
};
