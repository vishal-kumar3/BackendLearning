import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // yaha thoda change kr dena kyuki if same name ka file ayega to file overwrite ho jayega
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

export {upload}