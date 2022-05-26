const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user");



const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Verificar si el email existe

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User or Password not valid'
            })
        }

        // Si el usuario esta activo
        if (!user.state) {
            return res.status(400).json({
                msg: 'User is inactive or not exist in Data Base'
            })
        }

        // Verificar la password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "User / Password it's not valid"
            })
        }
        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error, contact an administrator'
        })
    }


}

module.exports = {
    login
}