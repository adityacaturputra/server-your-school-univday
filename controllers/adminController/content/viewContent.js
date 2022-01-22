const University = require('../../../models/University');
const Content = require('../../../models/Content');

module.exports = async (req, res) => {
  try {
    let content;
    if (req.session.user.universityId !== null) {
      content = await Content.find({ universityId: req.session.user.universityId }).populate({ path: 'universityId', select: '_id name' });
    } else {
      content = await Content.find().populate({ path: 'universityId', select: '_id name' });
    }

    content = content.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    const university = await University.find();
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    res.render('admin/content/view_content', {
      title: 'Univday | Content', alert, action: 'view', content, university, user: req.session.user,
    });
  } catch (error) {
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/dashboard');
  }
};
