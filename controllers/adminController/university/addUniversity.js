const Image = require('../../../models/Image');
const University = require('../../../models/University');

module.exports = async (req, res) => {
  try {
    const { name, image } = req.body;
    const savedImage = await Image.create({ imageUrl: image });
    await University.create({ name, imageId: savedImage._id, priorityLevel: 1 });
    req.flash('alertMessage', 'Success add University');
    req.flash('alertStatus', 'success');
    res.redirect('/admin/university');
  } catch (error) {
    console.log(error);
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/university');
  }
};
