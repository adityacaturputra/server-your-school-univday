const Image = require('../../../models/Image');
const University = require('../../../models/University');

module.exports = async (req, res) => {
  try {
    const { universityId, name, image } = req.body;
    const university = await University.findOne({ _id: universityId });
    await Image.findOneAndUpdate({ _id: university.imageId }, { imageUrl: image });
    university.name = name;
    await university.save();
    req.flash('alertMessage', 'Success update university');
    req.flash('alertStatus', 'success');
    res.redirect('/admin/university');
  } catch (error) {
    req.flash('alertMessage', `Failed update university: ${error.message}`);
    req.flash('alertStatus', 'danger');
    console.log(error);
    res.redirect('/admin/university');
  }
};
