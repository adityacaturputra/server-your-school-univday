const University = require('../../../models/University');
const Content = require('../../../models/Content');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findOne({ _id: id });
    const university = await University.findOne({ _id: content.universityId });
    university.contentId = university.contentId.filter(
      (contentId) => String(contentId) !== String(id),
    );
    await university.save();
    await content.remove();
    req.flash('alertMessage', 'Success delete content');
    req.flash('alertStatus', 'success');
    res.redirect('/admin/content');
  } catch (error) {
    req.flash('alertMessage', `Failed delete content: ${error.message}`);
    req.flash('alertStatus', 'danger');
    console.log(error);
    res.redirect('/admin/content');
  }
};
