const University = require('../../../models/University');
const Content = require('../../../models/Content');

module.exports = async (req, res) => {
  try {
    const { name, universityId, jeroanKonten } = req.body;
    const currentDate = new Date();
    const content = await Content.create({
      name, jeroanKonten, universityId, createdAt: currentDate, updatedAt: currentDate,
    });
    const university = await University.findOne({ _id: universityId });
    university.contentId.push(content._id);
    await university.save();
    req.flash('alertMessage', 'Success add Content');
    req.flash('alertStatus', 'success');
    res.redirect('/admin/content');
    return;
  } catch (error) {
    console.log(error);
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/content');
  }
};
