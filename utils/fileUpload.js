const multer =require('multer');

const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads");
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now().toLocaleString();
        cb(null,uniqueSuffix+"_"+file.originalname);
    },
});


function fileFilter(req,file,cb){
    if(file.mimetype ==="image/jpg" || file.mimetype === "image.jpeg" || file.mimetype === "image.png"){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const upload = multer({storage,fileFilter});
module.exports={upload};