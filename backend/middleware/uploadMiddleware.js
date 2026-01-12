const multer = require('multer');

//Configure storage
const storage = multer.diskStorage({
   destination:(req, file, cb)=>{
    cb(null, 'uploads/')
   } ,
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


// File filter
const fileFilter = (req, file, cb)=>{
    //Accept only images
 const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
}

const upload = multer({storage, fileFilter})

module.exports =upload