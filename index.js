require('dotenv').config();
const express = require('express');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const path = require('path');
const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth')
const staticRouter = require('./routes/staticRouter');
const connectToMongoDb = require('./connect');
const url = require('./models/url');
const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/',checkAuth,staticRouter);
app.use('/url',restrictToLoggedinUserOnly, urlRoute);
app.use('/user',userRoute);

//connect to mongodb
const Port = 8001;
const MONGO_URI = process.env.MONGODB_URI;
connectToMongoDb(MONGO_URI);

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
