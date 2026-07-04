require('dotenv').config();
const express = require('express');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const path = require('path');
const {checkForAuthentication,restrictTo} = require('./middlewares/auth')
const staticRouter = require('./routes/staticRouter');
const connectToMongoDb = require('./connect');
const url = require('./models/url');
const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthentication);
//routes
app.use('/',staticRouter);
app.use('/url',restrictTo(["NORMAL"]), urlRoute);
app.use('/user',userRoute);

//connect to mongodb
const Port = 8001;
const MONGO_URI = process.env.MONGODB_URI;
const User = require('./models/user');
connectToMongoDb(MONGO_URI).then(async () => {
    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    if (!adminExists) {
        await User.create({
            name: "admin",
            email: "admin@gmail.com",
            password: "admin@123",
            role: "ADMIN"
        });
        console.log("Hardcoded admin user created");
    }
});

//ejs
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "views"));

//get request for short id 
app.get('/:shortId', async (req, res) => {
    const shortID = req.params.shortId;
    const entry = await url.findOneAndUpdate({ shortID }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    });
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    let redirectUrl = entry.redirectUrl;
    if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
        redirectUrl = 'http://' + redirectUrl;
    }
    res.redirect(redirectUrl);
})
app.listen(Port, () => console.log(`Server Started at port:${Port}`));
module.exports = app;
