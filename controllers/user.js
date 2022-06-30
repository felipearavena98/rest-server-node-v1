const bcryptjs = require('bcryptjs');
const { response } = require('express');
const User = require('../models/user');

const userGet = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true }

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    })
}

const userPost = async (req, res = response) => {



    const { name, email, password, role } = req.body
    console.log(req.body)
    const user = new User({ name, email, password, role });

    // verify email


    //verify password
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    })
}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { password, google, email, ...resto } = req.body;

    // Validar contra la base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user)
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH API - Cotroller'
    })
}

const userDelete = async (req, res = response) => {

    const { id } = req.params;

    // Delete fisical user from Data Bases
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { state: false });


    res.json(user);
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}