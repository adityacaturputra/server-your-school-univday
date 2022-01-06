const University = require('../../../models/University');
const Content = require('../../../models/Content');

module.exports = async (req, res) => {
  try {
    const universities = await University.find();
    const contents = await Content.find();
    res.render('admin/dashboard/view_dashboard', {
      title: 'Univday | Dashboard', universities, contents, user: req.session.user,
    });
  } catch (error) {
    res.redirect('/admin/dashboard');
  }
};
