const bcrypt = require('bcryptjs');
const Users = require('../../../models/Users');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (!user) {
      req.flash('alertMessage', 'username doesnt exist');
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/signin');
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      req.flash('alertMessage', 'wrong password');
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/signin');
      return;
    }
    req.session.user = {
      id: user.id,
      username: user.username,
      universityId: user.universityId,
    };
    res.redirect('/admin/dashboard');
  } catch (error) {
    req.flash(`alertMessage', 'something goes wrong: ${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/signin');
  }
};
