module.exports = async (req, res) => {
  try {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    if (req.session.user == null || req.session.user === undefined) {
      res.render('index', { alert, title: 'Univday | Login' });
    } else {
      res.redirect('/admin/dashboard');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/admin/signin');
  }
};
