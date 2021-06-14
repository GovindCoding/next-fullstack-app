'use strict'
const sql = require("../config/db");
// const logger = require('../config/logger');
const SERVICE_FILE_NAME = "user.model :: ";

// constructor
const User = function(user) {
    this.first_name = user.firstName;
    this.last_name = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
    this.password = user.password;
    this.status = user.status;
    this.account_status = user.accountStatus;
    this.created_on = user.createdOn;
    this.otp = user.otp;
};

User.create = (newUser, result) => {
    const SERVICE_NAME = "create() :: ";
    console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into create user.");
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.error(SERVICE_FILE_NAME + SERVICE_NAME + "error: ", err);
            result(err, null);
            return;
        }
        console.info(SERVICE_FILE_NAME + SERVICE_NAME + "created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.getUserById = (userId, result) => {
    const SERVICE_NAME = "getUserById() :: ";
    console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into getUserById().");
    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.error(SERVICE_FILE_NAME + SERVICE_NAME + "error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.info(SERVICE_FILE_NAME + SERVICE_NAME + "found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

// User.getAll = result => {
//     const SERVICE_NAME = "getAll() :: ";
//     console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into getAll.");
//     sql.query("SELECT * FROM users", (err, res) => {
//         if (err) {
//             console.error(SERVICE_FILE_NAME + SERVICE_NAME + "error: ", err);
//             result(null, err);
//             return;
//         }
//         console.info(SERVICE_FILE_NAME + SERVICE_NAME + "users: ", res);
//         result(null, res);
//     });
// };

// User.updateById = (id, user, result) => {
//     const SERVICE_NAME = "updateById() :: ";
//     console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into updateById.");
//     sql.query(
//         "UPDATE users SET first_name = ?, last_name = ?, WHERE id = ?", [user.firstName, user.lastName, id], (err, res) => {
//             if (err) {
//                 console.error(SERVICE_FILE_NAME + SERVICE_NAME + "error: ", err);
//                 result(null, err);
//                 return;
//             }
//             if (res.affectedRows == 0) {
//                 // not found User with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }
//             console.info(SERVICE_FILE_NAME + SERVICE_NAME + "User updated successfully. : ", { id: id, ...user });
//             result(null, { id: id, ...user });
//         }
//     );
// };

User.findEmailParams = (type, result) => {
    const SERVICE_NAME = "findEmailParams() :: ";
    console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into findEmailParams.");
    sql.query(`SELECT * FROM params WHERE param_type = '${type}'`, (err, res) => {
        if (err) {
            console.error(SERVICE_FILE_NAME + SERVICE_NAME + "error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.info(SERVICE_FILE_NAME + SERVICE_NAME + "found email params: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.findEmailTemplate = (name, result) => {
    const SERVICE_NAME = "findEmailTemplate() :: ";
    console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into findEmailTemplate.");
    sql.query(`SELECT * FROM email_templates WHERE name = '${name}'`, (err, res) => {
        if (err) {
            console.error(SERVICE_FILE_NAME + SERVICE_NAME + "error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.info(SERVICE_FILE_NAME + SERVICE_NAME + "found email template: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.verifyEmail = (id, user, result) => {
    const SERVICE_NAME = "verifyEmail() :: ";
    console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into verifyEmail.");
    sql.query(`UPDATE users SET otp = ?, account_status = ? WHERE id =?`, [user.otp, user.accountStatus, id], (err, res) => {
        if (err) {
            console.error(SERVICE_FILE_NAME + SERVICE_NAME + "error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.info(SERVICE_FILE_NAME + SERVICE_NAME + "OTP verified successfully: ", { id: id, ...user });
        result(null, { id: id, ...user });
    });
};


User.login = (user, result) => {
    const SERVICE_NAME = "login() :: ";
    console.info(SERVICE_FILE_NAME + SERVICE_NAME + "Entering into login().");
    sql.query(`SELECT * FROM users WHERE email = '${user.email}' AND password = '${user.password}'`, (err, res) => {
        if (err) {
            console.error(SERVICE_FILE_NAME + SERVICE_NAME + "error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.info(SERVICE_FILE_NAME + SERVICE_NAME + "found user: ", res[0]);
            result(null, new User(res[0]));
            return;
        }
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
}


module.exports = User;