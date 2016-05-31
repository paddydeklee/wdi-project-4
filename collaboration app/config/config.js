module.exports = {
  'port': process.env.PORT || 3000,
  'secret': process.env.JWT_SECRET || 'jsonwebtokensaregreat',
  'database': process.env.MONGODB_URL || 'mongodb://localhost:27017/angular-authentication',
  'wdi_s3_bucket': process.env.WDI_S3_BUCKET,
  'aws_secret_access_key': process.env.AWS_SECRET_ACCESS_KEY,
  'aws_access_key_id': process.env.AWS_ACCESS_KEY_ID  
};
