'use strict'

const User = require("../../models/user.model");
const constants = require("../../config/constants.json")
// const logger = require('../../config/logger.js');
const APIResponse = require('../../config/apiResponse')
const SERVICE_FILE_NAME = "Users :: "

export default (req, res) => {
    if(req.method === "POST"){
        const SERVICE_NAME = "VerifyOTP() :: ";
        const reqObj = req.body;
        console.log(JSON.stringify(reqObj))
        try {
            console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into VerifyOTP.");
            User.getUserById(parseInt(reqObj.userId), (err, user) => {
                if (err) {
                    console.log(JSON.stringify(err));
                    console.error(SERVICE_FILE_NAME + SERVICE_NAME + "Error in retrieving user with email.");
                    return APIResponse.errorResponseWithError(res, "Error in retrieving user with email." + parseInt(reqObj.userId), "OTPE001", err);
                } else {
                    if (reqObj.otp === user.otp) {
                        user.accountStatus = constants.EMAIL_VERIFIED;
                        user.modifiedOn = new Date();
                        user.otp = null;
                        User.verifyEmail(parseInt(reqObj.userId), user, (err, data) => {
                            if (err) {
                                console.error(SERVICE_FILE_NAME + SERVICE_NAME + "Error while verifying email address. Error:" + JSON.stringify(err));
                                return APIResponse.errorResponseWithError(res, "Error while verifying email address.", "OTPE002", err);
                            } else {
                                console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Email verified successfully!");
                                return APIResponse.successResponse(res, "Email verified successfully!", "OTPS001");
                            }
                        });
                    } else {
                        console.error(SERVICE_FILE_NAME + SERVICE_NAME + "OTP is not valid!!");
                        return APIResponse.errorResponse(res, "OTP is not valid!", "OTPE003");
                    }
                }
            });
        } catch (error) {
            console.error(error);
            console.error(SERVICE_FILE_NAME + SERVICE_NAME + "Error in send OTP.");
            return APIResponse.errorResponseWithError(res, "Error in send OTP.", "OTPE004", error);
        }
    }
};