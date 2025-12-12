const express = require('express');
const router = express.Router();
const passport = require('passport');
const {prisma} = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
const path = require('path')
const fs = require('fs')
const multer = require("multer")


const uploadDir = path.join(__dirname, '..', 'public', 'data', 'uploads')
fs.mkdirSync(uploadDir, {recursive: true});


const upload = multer({ dest: uploadDir })

router.get("/", async (req, res) => {
    res.render("index", {user: req.user})
})

router.get("/signup", (req, res) => {
    res.render("sign-up")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}))

router.post("/signup",  async (req, res, next) => {
    try{ 
        const {email, password} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.create({
            data: {
                email: email,
                hash_password: hashedPassword
            }
        })
        res.redirect("/")
     }
    catch (err){
        return next(err)
    }
});


router.post("/upload", upload.single('document'), async (req, res, next) => {
    console.log('body:', req.body)
    console.log('file:', req.file)
    res.redirect("/")
})
module.exports = router;

