var express        = require('express');
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var app            = express();

// MULTER
var multer         = require('multer');
var upload         = multer({ dest: 'uploads/public/3Dmodels' });

var s3             = require('multer-s3');
var uuid           = require('uuid');

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

mongoose.connect(config.database);

require('./config/passport')(passport);

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] },
      { url: '/api/projects', methods: ['POST'] },
      { url: '/api/projects', methods: ['GET'] }
    ]
  }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

var routes = require('./config/routes');
app.use("/api", routes);

app.use("/", express.static(__dirname + "/public"));

app.use("/*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// this is the code for posting the amazon S3 bucket
// var upload = multer({
//   storage: s3({
//     // the folder within the bucket
//     dirname: 'uploads',
//     // set this to your bucket name
//     bucket: 'wdi-london',
//     // your AWS keys
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     // the region of your bucket
//     region: 'eu-west-1',
//     // IMPORTANT: set the mime type to that of the file
//     contentType: function(req, file, next) {
//       next(null, file.mimetype);
//     },
//     // IMPORTANT: set the file's filename here
//     // ALWAYS CHANGE THE FILENAME TO SOMETHING RANDOM AND UNIQUE
//     // I'm using uuid (https://github.com/defunctzombie/node-uuid)
//     filename: function(req, file, next) {
//       // Get the file extension from the original filename
//       var ext = '.' + file.originalname.split('.').splice(-1)[0];
//       // create a random unique string and add the file extension
//       var filename = uuid.v1() + ext;
//       next(null, filename);
//     }
//   })
// });
//
// // This will upload a single file.
// app.post('/upload/single', upload.single('file'), function(req, res) {
//   res.status(200).json({ filename: req.file.key });
// });
//
// // This will upload multiple files.
// app.post('/upload/multi', upload.array('files'), function(req, res) {
//   filenames = Object.keys(req.files).map(function(key) {
//     return req.files[key].key;
//   });
//   res.status(200).json({ filenames: filenames });
// });


app.listen(config.port);
