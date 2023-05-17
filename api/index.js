const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');
const app = express();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config()

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET_KEY;

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL)

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        // res.json(userDoc);
    } catch (error) {
        res.status(422).json(error);
    }

});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc)
            });
        } else {
            res.status(422).json({ error: "Invalid password" });
        }
    } else {
        res.status(404).json({ error: "User not found" });
    }
});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;

            const { name, email, _id } = await User.findById(userData.id);

            res.json({ name, email, _id });
        })
    } else {
        res.json(null)
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '\\uploads\\' + newName,
    });
    res.json(newName);
})

const photoMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photoMiddleware.array('photos', 50), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace("uploads\\", ""));


    }
    res.json(uploadedFiles);
})

app.post('/places', async (req, res) => {

    const { token } = req.cookies;
    const {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuest
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;

        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuest
        });

        res.json(placeDoc);

    })



})

app.get('/places', async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    })

})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
})

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuest
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {

            placeDoc.set({
                title, address, photos: addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuest
            }); 

            await placeDoc.save();
            res.json('ok');
        }
    })


});


app.listen(4000, () => {
    console.log('App is listening on port : 4000')
})





// https://www.youtube.com/watch?v=MpQbwtSiZ7E 4 hour 33 min


