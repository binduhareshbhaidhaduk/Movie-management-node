const multer =require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log(file,'file')
      const uniqueSuffix = Date.now() + file.originalname;
      console.log(uniqueSuffix,'uniqueSuffix')
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports=upload