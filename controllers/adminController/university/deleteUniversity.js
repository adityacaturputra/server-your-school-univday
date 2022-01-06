const Image = require('../../../models/Image');
const Users = require('../../../models/Users');
const University = require('../../../models/University');
const Content = require('../../../models/Content');
const Schedule = require('../../../models/Schedule');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const university = await University.findOne({ _id: id });
    const image = await Image.findOne({ _id: university.imageId });
    await university.remove();
    await image.remove();
    await Content.remove({ universityId: university._id });
    await Schedule.remove({ universityId: id });
    await Users.remove({ universityId: id });
    req.flash('alertMessage', 'Success delete university');
    req.flash('alertStatus', 'success');
    res.redirect('/admin/university');
  } catch (error) {
    req.flash('alertMessage', `Failed delete university: ${error.message}`);
    req.flash('alertStatus', 'danger');
    console.log(error);
    res.redirect('/admin/university');
  }
};
