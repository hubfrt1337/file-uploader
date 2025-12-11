const express = require('express');
const {PrismaSessionStore} = require('@quixo3/prisma-session-store');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const {prisma} = require("./lib/prisma.js")


passport.use(new LocalStrategy({usernameField: 'email'}, async function verify(email, password, done) {
    try { 
        const user = await prisma.user.findUnique({where: {email}});

        if(!user){
            return done(null, false, {message: "incorrect Email"})
        }
        // bcrypt.compare returns a Promise; await it so `match` is a boolean
        const match = await bcrypt.compare(password, user.hash_password);

        if(!match){
            return done(null, false, {message: "incorrect password"})
        }

        // Authentication successful
        return done(null, user);
    } catch(err){
        return done(err)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
    try{
        // `userId` is the serialized user id (number). The model's primary key
        // is `id`, so query by `id`.
        const user = await prisma.user.findUnique({where: {id: userId}})
        return done(null, user)
    } catch (err){
    return done(err)
    }
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');



app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        prisma,{
            checkPeriod: 2 * 60 *  1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))

app.get("/", (req, res) => {
    res.send("elo elo")
})
app.use(passport.initialize())
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});