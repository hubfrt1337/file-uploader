const express = require('express');
const router = express.Router();
const passport = require('passport');
const { prisma } = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
const path = require('path')
const fs = require('fs')
const multer = require("multer")
const {uploadToCloudinary} = require("../scriptCloud.js")




const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
    let folders = false;
    let folderFile = false;
    if (req.user) {
        folders = await prisma.folder.findMany({
            where: {
                userId: req.user.id
            }
        })
        folderFile = await prisma.folder.findMany({
            where: {
                userId: req.user.id,
                
            },
            include: {files: true}
        })
    }
    console.log(folderFile)
    res.render("index", { user: req.user, folders: folders, folderFiles: folderFile })
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
                    userId: Number(req.user.id)
                }
            })
        }
         const singleFolder = await prisma.folder.findUnique({
            where: {
                id: Number(folderId)
            }
         })
         
         const files = await prisma.file.findMany({
            where: {
                folderId: Number(folderId)
            }
         })
        res.render("folder", { user: req.user, folders: folders, singleFolder: singleFolder, files: files })

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

router.post("/upload/:folderId", upload.single('document'), async (req, res, next) => {
   
    const result = await uploadToCloudinary(req.file.buffer)
    await prisma.file.create({
        data: {
            folderId: Number(req.params.folderId),
            name: req.file.originalname,
            url: result.secure_url
        }
    })
    res.redirect(`/folder/${req.params.folderId}`)
})
module.exports = router;

