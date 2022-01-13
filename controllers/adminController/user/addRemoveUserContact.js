const Contact = require('../../../models/Contact');
const Users = require('../../../models/Users');

module.exports = async (req, res) => {
  try {
    const { id, universityId } = req.params;
    const user = await Users.findById(id);

    if (!user.contactId) {
      const contact = await Contact.create({
        name: 'name', contact: 'contact', universityId, userId: id,
      });
      user.contactId = contact.id;
      await user.save();
      req.flash('alertMessage', 'Success set as contact person');
      req.flash('alertStatus', 'success');
      return res.redirect('/admin/user');
    }
    await Contact.findOneAndRemove({ _id: user.contactId });
    user.contactId = null;
    await user.save();
    req.flash('alertMessage', 'Success unset contact person');
    req.flash('alertStatus', 'success');
    return res.redirect('/admin/user');
  } catch (error) {
    req.flash('alertMessage', `Failed setting contact person: ${error}`);
    req.flash('alertStatus', 'danger');
    return res.redirect('/admin/user');
  }
};
