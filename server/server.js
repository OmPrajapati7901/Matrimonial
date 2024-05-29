require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const PORT = process.env.PORT || 6005;
const session = require("express-session");
const passport = require("./config/passportConfig");
const userRoutes = require('./routes/userRoutes');
const entitlementRoutes = require('./routes/entitlementRoutes');
const authRoutes = require('./routes/authRoutes');
const ensureAuthenticated = require("./middlewares/ensureAuthenticated");

app.use(cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());

// setup session
app.use(session({
    secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // Session expires in 24 hours
    }
}));

// setup passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/verify", ensureAuthenticated, (req, res) => {
    res.status(200).json({ user: req.user });
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', ensureAuthenticated ,userRoutes);
app.use('/api/entitlements',ensureAuthenticated, entitlementRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`server start at port no ${PORT}`);
});
