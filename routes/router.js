const express = require('express');
const router = express.Router();
const passport = require('passport');
const { prisma } = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
const path = require('path')
const fs = require('fs')
const multer = require("multer")


const uploadDir = path.join(__dirname, '..', 'public', 'data', 'uploads')
fs.mkdirSync(uploadDir, { recursive: true });


const upload = multer({ dest: uploadDir })

router.get("/", async (req, res) => {
    let folders = false;
    if (req.user) {
        folders = await prisma.folder.findMany({
            where: {
                userId: req.user.id
            }
        })
    }

    res.render("index", { user: req.user, folders: folders })
})

router.get("/sign-up", (req, res) => {
    res.render("sign-up")
})

router.get("/log-in", (req, res, next) => {
    res.render("log-in")
})

router.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
}))

router.post("/sign-up", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.create({
            data: {
                email: email,
                hash_password: hashedPassword,
                folders: {
                    create: {
                        name: "Main"
                    }
                }
            }
        })
        res.redirect("/log-in")
    }
    catch (err) {
        console.log(err)
        return next(err)
    }
});

router.post('/create-folder', async (req, res, next) => {
    try {
        const { name, userId } = req.body;
        await prisma.folder.create({
            data: {
                name: name,
                userId: Number(userId)

            }
        })

        res.redirect(`/folder/${userId}`)
    } catch (err) {
        next(err)
    }
})


router.get("/folder/:folderId", async (req, res, next) => {
    try {
        const {folderId} = req.params

        let folders = false;
        if (req.user) {
            folders = await prisma.folder.findMany({
                where: {
                    userId: req.user.id
                }
            })
        }
         const singleFolder = await prisma.folder.findUnique({
            where: {
                id: Number(folderId)
            }
         })
         
        res.render("folder", { user: req.user, folders: folders, singleFolder: singleFolder })

        // to do, display files inside that folder
    } catch (err) {
        next(err)
    }
})

router.get("/logout", async (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/")
    });
})

router.patch("/folder/:folderId", async (req, res, next) => {
    
    try {
        await prisma.folder.update({
            where: { id: Number(req.params.folderId) },
            data: {
                name: req.body.name
            }
        })
        res.redirect(`/folder/${req.params.folderId}`)
    } catch (err) {
        next(err)
    }
})
router.delete("/folder/:folderId", async (req, res, next) => {
    try {
        const { folderId } = req.params;
        await prisma.folder.delete({
            where: {
                id: Number(folderId)
            }
        })
        res.redirect("/")
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.post("/upload", upload.single('document'), async (req, res, next) => {
    console.log('body:', req.body)
    console.log('file:', req.file)
    res.redirect("/")
})
module.exports = router;

