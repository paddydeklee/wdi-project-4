// MULTER
var multer   = require('multer');
var multerS3 = require('multer-s3');
var aws      = require('aws-sdk')
var config   = require("../config/config");

var s3       = new aws.S3({
  // your AWS keys
  secretAccessKey: config.aws_secret_access_key,
  accessKeyId: config.aws_access_key_id,
  // the region of your bucket
  region: 'eu-west-1',
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    // the folder within the bucket
    dirname: 'uploads',
    // set this to your bucket name
    bucket: config.wdi_s3_bucket,
    // IMPORTANT: set the mime type to that of the file
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
