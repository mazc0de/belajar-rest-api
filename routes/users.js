const router = require("express").Router();

let accessToken = "rahasia";
let userLogin = [];
let tempLogin = [];

// import dummy data
const dbUsers = require("../db/users.json");
const { get } = require("./public");

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const header = req.headers.authorization;
    const getUser = dbUsers.find((user) => user.username === username);
    const index = dbUsers.indexOf(getUser);

    if (userLogin.length > 0 && tempLogin.length > 0) {
        res.status(200).json({
            status: 200,
            data: {
                message: "you have login",
            },
        });
    } else {
        if (!getUser) {
            res.status(401).json({
                status: 401,
                data: {
                    message: "Unauthorized, username or password is wrong",
                },
            });
        } else {
            if (password !== getUser.password) {
                res.status(401).json({
                    status: 401,
                    data: {
                        message: "Unauthorized, username or password is wrong",
                    },
                });
            } else {
                userLogin.push(getUser);
                tempLogin.push({ username, password });
                accessToken = getUser.username + "-" + accessToken;

                res.status(201).json({
                    status: 201,
                    data: {
                        message: "login success",
                        username,
                        accessToken,
                    },
                });
                console.log(userLogin);
                console.log(tempLogin);
                console.log(accessToken);
                console.log("login sukses");
            }
        }
    }
});

router.get("/me", (req, res) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
        res.status(401).json({
            status: 401,
            data: {
                message: "Unauthorized, you no have access!",
            },
        });
    } else {
        if (authHeader == accessToken) {
            if (userLogin.length === 0) {
                res.status(401).json({
                    status: 401,
                    data: {
                        message: "Unauthorized, you must login first!",
                    },
                });
            } else {
                res.json({
                    status: 200,
                    data: { userLogin },
                });
                // res.status(201).send(userLogin);
            }
        } else {
            res.status(401).json({
                status: 401,
                data: {
                    message: "Unauthorized, please input key correctly!",
                },
            });
        }
    }
});

router.get("/logout", (req, res) => {
    req.headers.authorization = "";
    userLogin = [];
    accessToken = "rahasia";
    res.status(201).json({
        status: 201,
        msg: "successfully logout!",
    });
    console.log(req.headers.authorization, userLogin, accessToken);
});

module.exports = router;