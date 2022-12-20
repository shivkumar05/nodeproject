const express = require("express")
const battingController = require("../Controllers/user")
const commnMid = require("../Middleware/Auth")
const Router = express.Router()

Router.post("/user", battingController.createUser)
Router.post("/userlogin",battingController.userLogin)
Router.post("/batting", battingController.createBattings)
Router.post("/bowling", battingController.createBowlings)
Router.post("/wicket", battingController.createWickets)
Router.post("/postBowlings", battingController.postBowlings)
Router.get("/getBowlings",battingController.getBowlings)
Router.post("/postBattings", battingController.postBattings)
Router.get("/getBattings",battingController.getBattings)



//************ checking your end point valid or not */
Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = Router


