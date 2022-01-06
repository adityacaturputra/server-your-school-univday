const University = require('../../../models/University');
const Content = require('../../../models/Content');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findOne({ _id: id }).populate({ path: 'universityId', select: '_id name' });
    const university = await University.find();
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    console.log(content);
    res.render('admin/content/view_content', {
      title: 'Univday | Content', alert, action: 'edit', content, university, user: req.session.user,
    });
  } catch (error) {
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/dashboard');
  }
};
