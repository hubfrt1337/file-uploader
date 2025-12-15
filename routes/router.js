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
    failureRedirect: "/signup"
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

router.post('/create-folder', async (req, res, next) => {
    try {
        const {name, userId} = req.body;
        await prisma.folder.create({
            data: {
                name: name,
                userId: Number(userId)

            }
        })
        
    res.redirect(`/folder/${userId}`)
    }   catch (err) {
        next(err)
    }
})

router.get("/folder/:folderId", async (req, res, next) => {
    try {
        const {folderId} = req.params;
        res.send(folderId)

        // to do, display files inside that folder
    } catch (err){
        next(err)
    }
})

router.get("/logout", async (req, res, next) => {
    req.logout(function(err) {
        if(err) { return next(err);}
        res.redirect("/")
    });
})

router.patch("/folder/:folderId", async (req, res, next) => {
    try {
        await prisma.folder.update({
            where: {id: Number(req.params.id)},
            data: req.body.name
        })
        res.redirect("/")
    } catch (err){
        next(err)
    }
})

router.post("/upload", upload.single('document'), async (req, res, next) => {
    console.log('body:', req.body)
    console.log('file:', req.file)
    res.redirect("/")
})
module.exports = router;

