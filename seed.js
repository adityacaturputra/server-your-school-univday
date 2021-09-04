var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb+srv://adityacaturputra:sqkAmfiERitQGuCT@cluster0.reduu.mongodb.net/db_your_school_univday?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, function () {

  // Load Mongoose models
  seeder.loadModels([
    './models/University',
    './models/Content',
    './models/Users',
    './models/Image'
  ]);

  // Clear specified collections
  seeder.clearModels(['University', 'Content', 'Users', 'Image'], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  // start universities
  {
    'model': 'University',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901111'),
        name: 'Universitas Meme',
        imageId: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb1'),
        contentId: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223') },
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902224') },
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225') }
        ]
      },
    ]
  },
  // end universities
  // start content
  {
    'model': 'Content',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
        name: 'Alumni dari sma',
        jeroanKonten: 'lorem ipsum blablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
        universityId: mongoose.Types.ObjectId('5e96cbe292b97300fc901111')
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
        name: 'suatu konten',
        jeroanKonten: 'lorem ipsum blablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
        universityId: mongoose.Types.ObjectId('5e96cbe292b97300fc901111')
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225'),
        name: 'suatu konten kedua',
        jeroanKonten: 'lorem ipsum blablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
        universityId: mongoose.Types.ObjectId('5e96cbe292b97300fc901111')
      },
    ]
  },
  // end content

  // start image
  {
    'model': 'Image',
    'documents': [
      {
        // done
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cdb1'),
        imageUrl: 'http://assets.stickpng.com/images/5842f8afa6515b1e0ad75b2b.png'
      },
    ]
  },
  // end image

  {
    'model': 'Users',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        username: 'admin',
        password: 'rahasia',
      },
    ]
  }
];