const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const bodyParser = require("body-parser")
const router = require("./src/Routes/route")
const userprofile = require("./src/Models/profile")
const commnMid = require("./src/Middleware/Auth")
const port = process.env.PORT || 3000
const app = express();
const path = require("path")

app.use(bodyParser.json())

mongoose.set('strictQuery', false);

const storage = multer.diskStorage({
    destination: '../upload/image',
    filename: (req, file, cb) => {
        return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
})

app.use('/image', express.static('../upload/image'))
app.post("/user/:userId/userProfile", commnMid.jwtValidation, commnMid.authorization,  upload.single('image'), async (req, res) => {

    let data = req.body;
    let file = req.file;
    const userCreated = await userprofile.create(data)
    return res.status(201).send({
        profile_url: `${req.file.filename}`,
        data :  userCreated
    })
})

mongoose.connect("mongodb+srv://Aishwarya123:sg8eJZVpV9e3eEP3@cluster0.gf2pu4l.mongodb.net/Applications", {

})
    .then(() => console.log("MongoDB is connected successfully.."))
    .catch((Err) => console.log(Err))

app.use("/", router)

app.listen(port, function () {
    console.log(`Server is connected on Port ${port} ✅✅✅`)
})