const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
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

const googleSingIng = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { email, name, img } = await googleVerify(id_token);

        // Generate References
        let user = await User.findOne({ email });

        if (!user) {
            // Create User
            const data = {
                name,
                email,
                password: ':P',
                img,
                role: 'ADMIN_ROLE',
                google: true
            }
            user = new User(data)
            await user.save()
        }

        // if user exist in Database
        if (!user.state) {
            return res.status(401).json({
                msg: 'Contact with the administrator, user blocked'
            })
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Google token not valid'
        })
    }



}


module.exports = {
    login,
    googleSingIng
}