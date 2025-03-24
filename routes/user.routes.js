const express = require('express');
const { getuser, registeruser, login, getallbook, addbook, updatebook, deletebook } = require('../controller/user.controller');
const multer = require('multer');
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+"_"+ file.originalname)
    }
})
const upload = multer({ storage: storage })


router.get('/user',getuser)
router.post('/user',registeruser)
router.post('/login',login)
router.get('/book',getallbook)
router.post('/book',upload.single('image') ,addbook)
router.put('/book',updatebook)
router.delete('/book',deletebook)


module.exports = router