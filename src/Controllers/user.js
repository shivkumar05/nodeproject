const battingModel = require("../Models/battingModel")
const bowlingModel = require("../Models/bowlingModel")
const wicketModel = require("../Models/wicketModel")
const filterBowling = require("../Models/filterBowling")
const filterBatting = require("../Models/filterBatting")
const userprofile = require("../Models/profile")
const userModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt") 


const createUser = async function (req, res) {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "You must enter data." })
        }
        const encryptedPassword = bcrypt.hashSync(req.body.password, 12)
        req.body['password'] = encryptedPassword;

        let savedData = await userModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


const userLogin = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data

        let user = await userModel.findOne({ email: email })
       
        let compared = await bcrypt.compare(password, user.password)

        let token = jwt.sign({
            userId: user._id,
        }, "project",

        )

        return res.status(200).send({
            status: true,
            msg: "User login successfull",
            data: {
                userId: user._id,
                join_as : user.join_as,
                token: token
            }
        })
}
    catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}


const createBattings = async function (req, res) {
    try {
        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create batting"
            })
        }
        const battingCreated = await battingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Battings created successfully",
            data: battingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ========================================================================================

const createBowlings = async function (req, res) {
    try {

        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Bowlings"
            })
        }
        const bowlingCreated = await bowlingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Bowling created successfully",
            data: bowlingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}
// ==============================================================================
const createWickets = async function (req, res) {
    try {

        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Wickets"
            })
        }
        const wicketCreated = await wicketModel.create(data)
        return res.status(201).send({
            status: true,
            message: "Wicket created successfully",
            data: wicketCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}
//=============================================================================

const postBowlings = async function (req, res) {
    let data = req.body;

    const filterBow = await filterBowling.create(data)
    return res.status(201).send({
        status: true,
        message: "filterbowling created successfully",
        data: filterBow
    })
}

const getBowlings = async function (req, res) {
    let body = req.query
    const getBow = await filterBowling.find(body)
    return res.status(200).send({
        status: true,
        message: 'Success',
        data: getBow
    })
}
//========================================================================


const postBattings = async function (req, res) {
    let data = req.body;

    const filterBat = await filterBatting.create(data)
    return res.status(201).send({
        status: true,
        message: "filterbatting created successfully",
        data: filterBat
    })
}

const getBattings = async function (req, res) {
    let body = req.query
    const getBat = await filterBatting.find(body)
    return res.status(200).send({
        status: true,
        message: 'Success',
        data: getBat
    })
}

const updateUser = async function (req, res){
        try {
            let user_id = req.params.user_id
            let data = req.body
            data = JSON.parse(JSON.stringify(data))
            
            if (Object.keys(data).length == 0 && !req.files) {
                return res.status(400).send({
                    status: false,
                    msg: "For updating please put atleast one key"
                })
            }
    
            let updatedUser = await userModel.findOneAndUpdate({ _id: user_id }, { $set: data }, { new: true })
            if (!updatedUser) {
                return res.status(404).send({
                    status: false,
                    message: "no data found with this userId"
                })
            }
            return res.status(200).send({ status: true, message: "User profile updated", data: updatedUser })
        } catch (Err) {
            return res.status(500).send({
                status: false,
                msg: Err.message
            })
        }
    
    
    
}
module.exports = { createUser, userLogin, createBattings, createBowlings, createWickets, postBowlings, getBowlings, postBattings, getBattings, updateUser }