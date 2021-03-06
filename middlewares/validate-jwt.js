const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {

            token = req.headers.authorization.split(' ')[1];
            const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

            // Leer el usuario que corresponde al uid
            const user = await User.findById(uid);

            if (!user) {
                return res.status(401).json({
                    msg: 'Token is not valid - user not found or not exist in Data Base'
                })
            }

            // Verificar si el uid tiene estado en true
            if (!user.state) {
                return res.status(401).json({
                    msg: 'Token is not valid - user is inactive'
                })
            }

            req.user = user;

            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'Token not valid'
            })
        }
    }

    if (!token) {
        return res.status(401).json({
            msg: 'Token not valid or not exist in the request'
        })
    }

}

module.exports = {
    validateJWT
}