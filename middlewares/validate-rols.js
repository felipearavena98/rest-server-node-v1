const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'role check without the token'
        })
    }

    const { role, name } = req.user;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not admin`
        })
    }

}

const haveRole = (...rols) => {

    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'role check without the token'
            })
        }

        if (!rols.includes(req.user.role)) {
            return res.status(401).json({
                msg: `Service found only this rols ${rols}`
            })
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    haveRole
}