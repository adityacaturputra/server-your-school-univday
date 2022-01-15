const Contact = require('../../../models/Contact');

module.exports = async (req, res) => {
  try {
    const {
      id, name, contact, position,
    } = req.body;
    const contactFromDb = await Contact.findById(id);
    contactFromDb.name = name;
    contactFromDb.contact = contact;
    contactFromDb.position = position;
    await contactFromDb.save();
    req.flash('alertMessage', 'Success: edit contact person');
    req.flash('alertStatus', 'success');
    return res.redirect('/admin/user');
  } catch (error) {
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    return res.redirect('/admin/user');
  }
};
