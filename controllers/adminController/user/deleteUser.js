const Contact = require('../../../models/Contact');
const Users = require('../../../models/Users');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.findOne({ _id: id });
    await Contact.findOneAndRemove({ userId: id });
    await users.remove();
    req.flash('alertMessage', 'Success delete user');
    req.flash('alertStatus', 'success');
    res.redirect('/admin/user');
  } catch (error) {
    req.flash('alertMessage', `Failed delete user: ${error.message}`);
    req.flash('alertStatus', 'danger');
    console.log(error);
    res.redirect('/admin/user');
  }
};
