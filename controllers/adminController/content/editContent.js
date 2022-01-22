const University = require('../../../models/University');
const Content = require('../../../models/Content');

module.exports = async (req, res) => {
  try {
    const {
      name, universityId, jeroanKonten, oldUniversityId,
    } = req.body;
    const { id } = req.params;
    const content = await Content.findOne({ _id: id });
    const oldUniversity = await University.findOne({ _id: oldUniversityId });
    oldUniversity.contentId = oldUniversity.contentId.filter(
      (e) => String(e) !== String(content._id),
    );
    await oldUniversity.save();
    const university = await University.findOne({ _id: universityId });
    university.contentId.push(content._id);
    await university.save();
    content.name = name;
    content.universityId = universityId;
    content.jeroanKonten = jeroanKonten;
    content.updatedAt = new Date();
    await content.save();
    req.flash('alertMessage', 'Success update content');
    req.flash('alertStatus', 'success');
    res.redirect('/admin/content');
  } catch (error) {
    req.flash('alertMessage', `Failed update content: ${error.message}`);
    req.flash('alertStatus', 'danger');
    console.log(error);
    res.redirect('/admin/content');
  }
};
