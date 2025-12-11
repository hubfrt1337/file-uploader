const express = require('express');
const router = express.Router();
const passport = require('passport');
const {prisma} = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");


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

module.exports = router;

