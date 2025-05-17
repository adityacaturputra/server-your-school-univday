const Users = require('../../../models/Users');

module.exports = async (req, res) => {
  try {
    const { username, password, universityId } = req.body;
    const users = await Users.find({ username });
    if (users.length === 0) {
      await Users.create({ username, password, universityId });
      req.flash('alertMessage', 'Success add User');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/user');
      return;
    }
    req.flash('alertMessage', 'username tadinya sudah ada');
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/user');
  } catch (error) {
    console.log(error);
    req.flash('alertMessage', `Failed: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/user');
  }
};
