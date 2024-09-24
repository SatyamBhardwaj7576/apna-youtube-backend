import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./public/temp")
      //cb is basically callback
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      //file ka naam change kar sakte hain ass agrr user same naam ki 3,4 
      //file upload karega to wo ow=verwrite ho jayegi
      //isliye iss functionality ko khud se add karna hai
      //project complete hone ke baad 
    }
  })
  
export const upload = multer({
     storage: storage 
    });