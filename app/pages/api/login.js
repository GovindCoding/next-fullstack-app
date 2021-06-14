'use strict'
import jwt from 'jsonwebtoken'
const User = require("../../models/user.model.js");
const constants = require("../../config/constants.json")
// const logger = require('../../config/logger.js');
const APIResponse = require('../../config/apiResponse')
const SERVICE_FILE_NAME = "Users :: "

export default (req, res) => {
    if(req.method === "POST"){
        const SERVICE_NAME = "login() :: ";
        var reqObj = req.body;
        try {
            console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into login().");
            User.login(new User(reqObj), async (err, user) => {
                if (err) {
                    console.error(SERVICE_FILE_NAME + SERVICE_NAME + "Error while login user. Error:" + err);
                    return APIResponse.errorResponseWithError(res, "Error while login user. ", "LGNE001", err);
                } else {
                    delete user.password;
                    user.accessToken = await jwtSign({ username: user.email, userId: user.id, phone: user.phone });
                    console.info(SERVICE_FILE_NAME + SERVICE_NAME + "User login successfully.");
                    return APIResponse.successResponseWithData(res, "User login successfully.", user, "LGNS001");
                }
            });
        } catch (error) {
            console.log(error);
            console.error(SERVICE_FILE_NAME + SERVICE_NAME + "Something went wrong while login. Error:" + error);
            return APIResponse.errorResponseWithError(res, "Something went wrong while login.", "LGNE002", error);
        }
    }
}


function jwtSign (payload) {
    const token = jwt.sign(payload, constants.SECRET_KEY, { expiresIn: '900s' });
    return token;
}